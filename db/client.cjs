const {Client}= require('pg');
const client= new Client(process.env.DATABASE_URL || 'postgres://vougi:Strong4hold!@localhost:/forbidden_fragrance')

module.exports= client;