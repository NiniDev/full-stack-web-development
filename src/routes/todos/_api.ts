// TODO: Persist todos in database
let todos: Todo[] = [];

export const api = (request: Request, todo?: Todo, uid?: string) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            status = 200;
            body = todos;
            break;

        case "POST":
            todos.push(todo || {} as Todo);
            body = todo || {};
            status = 201;
            break;
        case "DELETE":
            todos = todos.filter(t => t.uid !== uid);
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
