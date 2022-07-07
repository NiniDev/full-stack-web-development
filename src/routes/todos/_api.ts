import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?: Record<string, unknown>) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            body = await prisma.todo.findMany();
            status = 200;
            break;

        case "POST":
            body = await prisma.todo.create({data: {
                created_at: data?.created_at as Date,
                text: data?.text as string,
                done: data?.done as boolean,
            }});
            status = 201;
            break;
        case "DELETE":
            body = await prisma.todo.delete({where: {uid: data?.uid as string}});
            status = 204;
            break;

        case "PATCH":
            body = await prisma.todo.update({where: {uid: data?.uid as string}, data: {
                text: data?.text as string | undefined,
                done: data?.done as boolean | undefined,
            }});
            status = 200;
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
