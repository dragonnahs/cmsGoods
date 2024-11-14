export async function GET(request: Request) {
    console.log(request)
    return new Response(JSON.stringify({
        message: 'success',
        data: {
            list: [
                {
                    id: 1,
                    title: 'title1',
                    content: 'content1'
                },
                {
                    id: 2,
                    title: 'title2',
                    content: 'content2'
                }
            ]
        }
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}