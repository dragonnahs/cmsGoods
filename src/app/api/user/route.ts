/*
 * @Author: shanlonglong danlonglong@weimiao.cn
 * @Date: 2024-11-11 17:18:40
 * @LastEditors: shanlonglong danlonglong@weimiao.cn
 * @LastEditTime: 2024-11-15 13:54:47
 * @FilePath: \react-next-p\src\app\api\user\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export async function GET() {
    return new Response(JSON.stringify({message: 'Hello World'}), {
        status: 200
    })
}

