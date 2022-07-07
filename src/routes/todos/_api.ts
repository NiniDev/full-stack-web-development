// TODO: Persist todos in database
let todos: Todo[] = [];

export const api = (request: Request, data?: Record<string, unknown>) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            status = 200;
            body = todos;
            break;

        case "POST":
            todos.push(data as Todo);
            body = data || {};
            status = 201;
            break;
        case "DELETE":
            todos = todos.filter(t => t.uid !== data?.uid);
            break;

        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === data?.uid) {
                    todo.text = data.text as string;
                }
                return todo;
            });
            status = 200;
            break;


        default:
            break;
    }

    if (request.method.toUpperCase() !== "GET") {
        return {
            status: 303,
            headers: {
                Location: "/"
            }
        }
    }


    return { status, body };
}
