const {getUser, getUserByToken}= require('./db/users.cjs');


const client= require('./db/client.cjs');
client.connect();

const express= require('express');
const app= express();

app.use(express.static('dist'));
app.use(express.json());

app.post('/api/v1/users', async(req, res, next)=> {
  try{
    console.log('REQ BODY', req.body);
    const {username, password}= req.body;
    const user=await getUser(username, password);
  }catch(err) {
    next(err);
  }
});

app.get('/api/v1/users', async(req, res, next)=> {
  try {
    const token= req.headers.authorization;
    const user= await getUserByToken(token);
    res.send({userId})
  }catch(err) {
    console.log(err)
  }
})

const PORT = process.env.PORT || 5173;
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));