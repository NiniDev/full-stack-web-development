import type { RequestHandler } from "@sveltejs/kit";

// TODO: Persist todos in database
let todos: Todo[] = [];

export const get: RequestHandler = async ({ request }) => {
  return {
    status: 200,
    body: todos,
  }
}

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  todos.push({
    text: formData.get("text") as string,
    done: false,
    created_at: new Date(),
  });

  return {
    status: 303,
    headers: {
        Location: "/"
    }
  }
}