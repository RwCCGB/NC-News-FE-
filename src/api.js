const base = import.meta.env.VITE_API_BASE

export async function getArticles(){
    const result = await fetch('/api/articles')
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg + " Boo")
    }
    const data = await result.json()
    return data.articles
}