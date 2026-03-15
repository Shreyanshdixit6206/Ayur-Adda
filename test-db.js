const { Client } = require('pg'); 
const client = new Client({ connectionString: 'postgresql://postgres.npcmwgqfbqjplyztdliz:Ayur%40adda123@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres' }); 
client.connect()
  .then(() => { 
    console.log('Connected'); 
    client.end(); 
  }).catch(err => { 
    console.error('Connection error [full]:', err); 
    client.end(); 
  });
