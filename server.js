//import app from backend/app
const app =require('./backend/app');
//server is listening on port 3005

app.listen(3005 , () => {
    console.log('express server is listening on port 3005...')
})