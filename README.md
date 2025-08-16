# NC News

#NC News displays a list of articles which contains data for comments, votes and the topic(s) of each article.  The list can be sorted, with new comments added or removed, votes added or subtracted.   The user can search for topics, and find a list of all articles on that topic, and from each article can click the hashtag of the topic to do the same.

## Technical Info
- Deployed Site: https://symphonious-pithivier-7688fd.netlify.app/articles?sort_by=created_at&order=desc
- Render API: https://nc-news-dxk7.onrender.com/api/ 
- Repos:
    - BE: https://github.com/RwCCGB/nc-news
    - FE: https://github.com/RwCCGB/nc-news
- Node Version: v24.2.0
- Dev/Test DB: Postgres
- Prod DB: Postgres (Supbase hosted)
- Prod APIs: (Render hosted)

## Running Locally
To run locally, clone each repo.  npm run dev for the backend first, then the front-end.  To run from the web ping or awaken Render first.  A "Keep Alive" script is available in the FE repo.

Clone Repos:
```sh
git clone [BE Repo]
cd [path to repo location]
npm i
(create .env.development, .env.test and .env.production files in the root directory)
Run the file run-seed.js to seed the DB with test data
git clone [FE Repo]
cd [path to repo location]
npm i
```

Run Keep Alive:
```sh
cd [path to FE repo location / Utils]
npm install node-fetch
node keepAlive.js
```

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)