import fetch from "node-fetch"

const URL = "https://nc-news-dxk7.onrender.com/api/articles?limit=1"

const ping = async () => {
    try{
        const result = await fetch(URL)
        if(result.ok){
            console.log("Ping OK")
        }
        else{
            console.log(`Ping Failed: ${result.status}`)
        }
    }
    catch(error){
        console.log(`Ping Error: ${error.message}`)
    }
}

setInternal(ping, 5 * 60 * 1000)
ping()