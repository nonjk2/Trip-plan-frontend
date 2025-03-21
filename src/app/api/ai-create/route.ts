import { EventHandler } from '@/lib/server/eventHandler';
import OpenAI from 'openai';
import { TextDeltaBlock } from 'openai/resources/beta/threads/messages.mjs';

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  const {
    message,
    threadId: clientThreadId,
    planData,
  }: {
    message: string;
    threadId: string | null;
    planData: PlanDataType;
  } = await req.json();
  // console.log(clientThreadId);
  const threadIdToUse =
    clientThreadId ??
    (
      await openai.beta.threads.create({
        messages: [
          {
            role: 'assistant',
            content: `${planData.startDate}부터 ${planData.endDate}까지 
          ${planData.people}명이 ${planData.category
              .map((c) => `${c.parent} ${c.child}`)
              .join(', ')} 지역에서 여행을 하시네요! 🚀 
          먼저 1일차의 출발지와 목적지를 정해볼까요? 숙박시설도 포함하면 좋아요!`,
          },
          {
            role: 'user',
            content: `사용자의 초기 여행정보 : ${JSON.stringify(planData)}`,
          },
        ],
      })
    ).id;

  await openai.beta.threads.messages.create(threadIdToUse, {
    role: 'user',
    content: message,
  });

  return new Response(
    new ReadableStream({
      async start(controller) {
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(' ');
          } catch {
            clearInterval(heartbeat);
          }
        }, 10000);

        try {
          const eventHandler = new EventHandler(openai, controller);
          eventHandler.on('event', eventHandler.onEvent.bind(eventHandler));

          const stream = await openai.beta.threads.runs.stream(threadIdToUse, {
            assistant_id: process.env.NEXT_PUBLIC_ASSISTANT_ID!,
            stream: true,
          });

          controller.enqueue(`[THREAD_ID]${threadIdToUse}\n`);

          for await (const chunk of stream) {
            const { event, data } = chunk;
            if (event === 'thread.message.delta') {
              if (data.delta.content) {
                const deltaText = data.delta.content[0] as TextDeltaBlock;
                const chunkText = deltaText.text?.value || '';

                if (controller) {
                  controller.enqueue(chunkText);
                }
              }
            }
            if (event === 'thread.run.requires_action') {
              eventHandler.emit('event', { event, data });
            }

            if (event === 'thread.run.completed') {
              console.log('hi');
              controller.enqueue('[DONE]');
              controller.close();
            }
          }
        } catch (error) {
          console.error('AI 스트리밍 오류:', error);

          controller.close();
        }
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    }
  );
}
