import { fetchApi } from "./request"

export const fetchGetPosts = async () => {
    return  await fetchApi('/api/post', { method: 'GET' }) 
}