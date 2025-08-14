const base = import.meta.env.VITE_API_BASE

export async function getArticles(){
    const result = await fetch('/api/articles')
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }
    const data = await result.json()
    return data.articles
}

export async function getArticleById(article_id){
    const result = await fetch(`/api/articles/${article_id}`)
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }
    const data = await result.json()
    return data.article
}

export async function getCommentsByArticleId(article_id){
    const result = await fetch(`/api/articles/${article_id}/comments`)
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }
    const data = await result.json()
    return data.comments
}

export async function postCommentByArticleId(article_id, comment){
    let dataToJson = JSON.stringify(comment)
    const result = await fetch(`/api/articles/${article_id}/comments`, 
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: dataToJson
            })
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }

    const data = await result.json()
    return data.comment
}