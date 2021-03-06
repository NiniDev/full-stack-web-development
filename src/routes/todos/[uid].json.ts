import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api"

export const del: RequestHandler = async ({ params, request }) => {
    return api(request, {uid: params.uid as string});
}

export const patch: RequestHandler = async ({ params, request }) => {
    const formData = await request.formData()    
    return api(request, {
        text: formData.has("text") ? formData.get("text") as string : undefined,
        done: formData.has("done") ? !!formData.get("done") : undefined,
        uid: params.uid as string
    })
}