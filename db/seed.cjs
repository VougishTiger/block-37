const client= require('./client.cjs');
const {createUser}= require('./users.cjs')

const dropTables= async()=> {
  try{
    await client.query(`
      DROP TABLE IF EXISTS users;
      `);
  }catch(err) {
    console.log(err);
  }
}

const createTables= async()=> {
  try {
    await client.query(`
      CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(60) NOT NULL
      );
      `);
  }catch(err) {
    console.log(err);
  }
}

const syncAndSeed= async()=> {
  await client.connect();
  console.log('Connected to the DB');

  await dropTables();
  console.log('Tables Dropped!')

  await createTables();
  console.log('Tables Created!');
  
  await createUser('Man_Iron', 'I_am_IronMan');
  console.log('User Created!');

  await createUser('Captian_America', 'USOFA');
  console.log('User Created!');

  await createUser('The_Hammrin_Thor', 'Thunder_God');
  console.log('User Created!');
  
  await client.end();
  console.log('Disconnected from the DB');
}

syncAndSeed();
