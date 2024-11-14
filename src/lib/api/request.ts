

export const fetchApi = async (url: string, options?: RequestInit) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, options);
    const data = await response.json();
    return data
}