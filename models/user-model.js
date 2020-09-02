const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');

async function register(user){
    user.password = await bcrypt.hash(user.password,14);
    // user.confirm_password = await bcrypt.hash(user.confirm_password,14);
    const id = await db('users').insert(user)

    return findByEmail(user.email)
}

function findByEmail(email) {
    return db('users')
            .select('*')
            .where(email)
            .first()
}
function findById(id) {
    return db('users')
            .select('*')
            .where(id)
            .first()
}

module.exports = {
    register,
    findByEmail,
    findById
}