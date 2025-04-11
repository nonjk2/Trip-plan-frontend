// app/api/generate-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '', // 서버 전용 키니까 NEXT_PUBLIC 붙이면 안됨!
});

export async function POST(req: NextRequest) {
  try {
    const { region } = await req.json();

    if (!region) {
      return NextResponse.json(
        { error: 'Region is required' },
        { status: 400 }
      );
    }

    const prompt = `${region} 해당 지역의 특산물이나 특징 또는 해당지역의 특성을 살려서 그려줘 입체적일수록좋아 해당 지역을 나타내는 썸네일로 나타낼거야`;

    const image = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      n: 1,
      size: '512x512',
      response_format: 'b64_json',
    });

    const imageUrl = image?.data?.[0].b64_json;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image generation failed' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      base64: image.data[0].b64_json,
    });
  } catch (err) {
    console.error('[Image Generation Error]', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
