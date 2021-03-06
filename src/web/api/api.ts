const API_BASE_URL = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000"

export async function get(path: string, query: string[] = []): Promise<any> {
    const queryString = query.length > 0 
        ? "?" + query.join("&")
        : ""
    const response = await fetch(API_BASE_URL + path + queryString)
    return response.json()
}

export async function post(path: string, body: any) {
    const response = await fetch(
        API_BASE_URL + path,
        {
            method: "POST",
            body,
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return response.json()
}

export async function put(path: string, body: any) {
    const response = await fetch(
        API_BASE_URL + path,
        {
            method: "PUT",
            body,
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return response.json()
}

export async function del(path: string) {
    const response = await fetch(API_BASE_URL + path, { method: "DELETE"})
    return
}
