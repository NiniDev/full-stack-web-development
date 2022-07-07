import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get: RequestHandler = async ({ request }) => {
  return api(request);
}

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  return api(request, {
    text: formData.get("text") as string,
    done: false,
    created_at: new Date(),
    uid: `${Date.now()}` // TODO: use uid generator
  });
}