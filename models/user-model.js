const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');

async function register(user){
    user.password = await bcrypt.hash(user.password,14);
    // user.confirm_password = await bcrypt.hash(user.confirm_password,14);
    const id = await db('users').insert(user)

    return findByEmail(user.email)
}

async function findByEmail(email) {
    try {
        const user = await db('users')
        .select('*')
        .where(email)
        .first()
        return user
    }catch(err) {
        console.log(err)
    }
    
}
function findById(id) {
   try {
    return db('users')
    .select('*')
    .where(id)
    .first()
   }catch(err) {
 console.log(err)
   }
}

module.exports = {
    register,
    findByEmail,
    findById
}