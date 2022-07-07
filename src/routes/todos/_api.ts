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
            status = 204;
            todos = todos.filter(t => t.uid !== data?.uid);
            break;

        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === data?.uid) {
                    if (data.text !== null) todo.text = data.text as string;
                    else todo.done = data.done as boolean;
                }
                return todo;
            });
            status = 200;
            body = todos.find(t => t.uid === data?.uid) || {};
            break;

        default:
            break;
    }

    if (request.method.toUpperCase() !== "GET" && request.headers.get('accept') !== 'application/json') {
        return {
            status: 303,
            headers: {
                Location: "/"
            }
        }
    }


    return { status, body };
}
