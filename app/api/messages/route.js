let messages = [];

export async function GET() {
  return Response.json(messages);
}

export async function POST(req) {
  const body = await req.json();

  messages.push({
    text: body.text,
    user: body.user,
    time: Date.now()
  });

  return Response.json({ success: true });
}
