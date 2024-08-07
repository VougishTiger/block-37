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
// uncomment this when you get the jwt working
// app.get('/api/v1/users', async(req, res, next)=> {
//   try {
//     const token= req.headers.authorization;
//     const user= await getUserByToken(token);
//     res.send({user})
//   }catch(err) {
//     console.log(err)
//   }
// })

app.get('/api/v1/users/:user', async(req, res, next)=> {
  try {
    const { username, password } = req.query;
    if(!username || !password) {
      return res.send(400).send({ error: 'Username and password required'});
    }
    const user= await getUser(username, password);
    res.send({user})
  }catch(err) {
    console.log(err)
  }
})

const PORT = process.env.PORT || 5173;
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));