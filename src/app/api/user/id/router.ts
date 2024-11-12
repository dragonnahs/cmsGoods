export async function GET(request: Request, {params}: {params: {id: string}}) {
    console.log(request, params.id)
    return new Response(JSON.stringify({id: params.id}), {
        status: 200
    })
}