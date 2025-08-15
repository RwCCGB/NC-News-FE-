export async function SetupApi(apiUrl, method, headers){
    const result = await fetch(apiUrl)
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }
    const data = await result.json()
    return data
}