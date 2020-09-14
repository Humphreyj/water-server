const db = require('../db/dbConfig');

function getAllRestaurants() {
    try{
        return db('restaurants')
            .select("*")
    }catch(err) {
        console.log(err)
    }
    
}

function getRestaurantById(id) {
    try{
        return db('restaurants')
            .select("*")
            .where({id})
            .first()
    }catch(err) {
        console.log(err)
    }
    
}

 function addRestaurant(restaurant) {
    try{

    }catch(err) {
        console.log(err)
    }
    const newRestaurant = {...restaurant}
    return db('restaurants')
        .insert(newRestaurant)
}

 async function deleteRestaurant(id) {
    try {
        return await db('restaurants')
                        .where({id})
                        .del()
    }catch(err) {
        console.log(err)
    }
}




module.exports = {
    getAllRestaurants,
    getRestaurantById,
    addRestaurant,
    deleteRestaurant,
    
}