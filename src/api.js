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

export async function patchArticleVotesById(article_id, inc_votes){
    
    const result = await fetch(`/api/articles/${article_id}`, {
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({inc_votes: Number(inc_votes)})
    })

    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }

    const {article} = await result.json()
    return article
}

export async function deleteCommentById(comment_id){
    const result = await fetch(`/api/comments/${comment_id}`, {
        method: "DELETE",
    })

    let message = ""
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        message = `Error ${result.status}`
        throw new Error(msg)
    }
    return true
}

export async function getTopics(slug){
    const result = await fetch(`/api/topics`)
    if(!result.ok){
        const {msg} = await result.json().catch(()=>({msg: `Error ${result.status}`}))
        throw new Error(msg)
    }
    const data = await result.json()
    return data.topics
}

export async function getArticlesByTopic(slug){
    const result = await fetch(`/api/topics`)
} 