const {getUser, getUserByToken}= require('./db/users.cjs');
require('dotenv').config();

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

app.put('/api/v1/users/:id', async(req, res, next)=> {
  try {
    const userId= req.params.id;
    console.log(req.params.id);
    const {username, password}= req.body;
    
    console.log(req.body)
    
    const userIndex= users.findIndex((user)=> user.id=== userId);
    if (userIndex !== -1) {
      users[userIndex]= {...users[userIndex], username, password};
      res.json({success: true, user: users[userIndex]});
    } else {
      res.status(404).json({success:false, message: 'User not found'});
    }
  } catch(err) {
    console.log()
  }
})

const PORT = process.env.PORT || 5173;
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));