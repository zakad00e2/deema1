import { handleContactRequest } from "./contact-handler";

export async function POST(request: Request): Promise<Response> {
  return handleContactRequest(request, process.env);
}

export function GET(): Promise<Response> {
  return Promise.resolve(
    new Response(JSON.stringify({ message: "Method not allowed." }), {
      status: 405,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    }),
  );
}
