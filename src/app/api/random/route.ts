import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const min = searchParams.get('min') || '0';
  const max = searchParams.get('max') || '100';

  try {
    const response = await fetch(
      `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch random number');
    }

    const randomNumber = await response.text();
    return NextResponse.json(parseInt(randomNumber.trim()));
  } catch (error) {
    console.warn('Random.org API failed:', error);
    const randomNumber = Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min);
    return NextResponse.json(randomNumber);
  }
}
