import { EventEmitter } from 'events';
import { recommendPlace } from '@/lib/server/function';
import { TextDeltaBlock } from 'openai/resources/beta/threads/messages.mjs';
import OpenAI from 'openai';
import { RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/runs/runs.mjs';

export class EventHandler extends EventEmitter {
  private controller: ReadableStreamDefaultController | null = null;

  constructor(
    private client: OpenAI,
    controller: ReadableStreamDefaultController
  ) {
    super();
    this.controller = controller;
  }

  async onEvent({ event, data }: OpenAI.Beta.Assistants.AssistantStreamEvent) {
    try {
      console.log('🔹 Event received:', event);

      switch (event) {
        case 'thread.run.requires_action':
          console.log(
            '⚠️ requires_action 발생!',
            data.required_action?.submit_tool_outputs.tool_calls
          );

          await this.handleRequiresAction(data, data.id, data.thread_id);

          return;

        case 'thread.run.step.delta':
          //   console.log(data.delta.step_details?.tool_calls[0]);
          break;
        case 'thread.created':
          //   console.log('🔹 새 스레드 생성됨:', data);
          break;

        case 'thread.run.created':
          //   console.log('▶️ 실행 시작:', data);
          break;

        case 'thread.run.queued':
          //   console.log('⏳ 실행 대기 중...');
          break;

        case 'thread.run.in_progress':
          //   console.log('🚀 실행 진행 중...');
          break;

        case 'thread.run.completed':
          console.log(' 실행 완료:', data);
          if (this.controller) {
            this.controller.enqueue('[DONE]');
            this.controller.close();
          }

          break;

        case 'thread.run.failed':
          //   console.error('실행 실패:', data);
          break;

        case 'thread.message.created':
          //   console.log('💬 새로운 메시지 생성됨:', data);
          //   console.log('컨트롤러', this.controller?.desiredSize);
          break;

        case 'thread.message.delta':
          if (data.delta.content) {
            const deltaText = data.delta.content[0] as TextDeltaBlock;
            const chunkText = deltaText.text?.value || '';

            if (this.controller) {
              this.controller.enqueue(chunkText);
            }
          }
          break;

        case 'thread.message.completed':
          console.log('📩 메시지 전송 완료:', data);

          break;

        case 'thread.message.incomplete':
          console.warn('⚠️ 메시지가 미완료 상태로 끝남:', data);
          break;

        default:
          console.warn(`⚠️ 알 수 없는 이벤트: ${event}`);
      }
    } catch (error) {
      console.error('❌ Error handling event:', error);
    }
  }

  async handleRequiresAction(
    data: OpenAI.Beta.Threads.Runs.Run,
    runId: string,
    threadId: string
  ) {
    try {
      console.log('🛠 handleRequiresAction 실행됨!');
      console.log(data.required_action?.submit_tool_outputs.tool_calls);
      const toolOutputs: RunSubmitToolOutputsParams.ToolOutput[] =
        await Promise.all(
          data.required_action!.submit_tool_outputs.tool_calls.map(
            async (toolCall) => {
              if (toolCall.function.name === 'recommend_place') {
                console.log('🔍 recommend_place 실행 중...');
                const args = JSON.parse(toolCall.function.arguments);
                const jsonData = await recommendPlace(args.placeName);
                console.log(' recommendPlace 실행 완료:', jsonData);
                return {
                  tool_call_id: toolCall.id,
                  output: JSON.stringify(jsonData),
                };
              } else {
                return {
                  tool_call_id: toolCall.id,
                  output: '',
                };
              }
            }
          )
        );

      console.log('📦 툴 실행 결과:', toolOutputs);
      const stream = await this.client.beta.threads.runs.submitToolOutputs(
        threadId,
        runId,
        {
          stream: true,
          tool_outputs: toolOutputs,
        }
      );
      // let isCompleted = false;

      for await (const { data, event } of stream) {
        this.emit('event', { data, event });
        if (event === 'thread.message.completed') {
          // isCompleted = true;
          // console.log('🔴 툴 실행 완료, 컨트롤러 닫기 준비');

          if (this.controller) {
            this.controller.enqueue(
              `[TOOL_OUTPUT]${JSON.stringify(toolOutputs)}\n`
            );
          }
          continue;
        }
        // if (event === 'thread.run.completed') {
        //   if (this.controller) {
        //     this.controller.enqueue(
        //       `[TOOL_OUTPUT]${JSON.stringify(toolOutputs)}\n`
        //     );
        //   }
        // }
      }
      // if (!isCompleted && this.controller) {
      //   console.warn('⚠️ `thread.run.completed`를 감지하지 못함. 강제 종료');
      //   this.controller.enqueue('[DONE]');
      //   this.controller.close();
      // }
    } catch (error) {
      console.error('❌ Error processing required action:', error);
      return null;
    }
  }
}
