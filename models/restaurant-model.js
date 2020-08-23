const db = require('../db/dbConfig');

function getAllRestaurants() {
    return db('restaurants')
            .select("*")
}

function getRestaurantById(id) {
    return db('restaurants')
            .select("*")
            .where({id})
            .first()
}

 function addRestaurant(restaurant) {
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
    deleteRestaurant
}