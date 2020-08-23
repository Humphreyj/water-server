const db = require('../../db')
const resto_db = require('../../models/restaurant-model');
const router = require('express').Router()

router.get('/', async (req,res) => {
    try{
        const results= await resto_db.getAllRestaurants()
        console.log(results)
        res.status(200).json({
            data: results
   })
    }catch(err) {
        console.log(err)
    }
  
   
})
router.get('/:id', async (req,res) => {
    try{
        const result = await resto_db.getRestaurantById(req.params.id)
        //I guess this is a parameterized query. I don't really like how it looks so im going to revisit it.
        res.status(200).json({
            data: result
        })
    }catch(err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    const newRestaurant = req.body;

    try {
        res.status(201).json(await resto_db.addRestaurant(newRestaurant))
    }catch(err) {
        console.log(err)
    }
    
    
})

router.put('/:id', async (req, res) => {
    try{
        const result = await db.query('UPDATE restaurants SET name = $1, location =$2,price_range = $3 WHERE id = $4 returning *',[req.body.name,req.body.location,req.body.price_range,req.params.id])
        res.status(200).json({data: result.rows[0]})
    }catch(err) {
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const result = await resto_db.deleteRestaurant(req.params.id)
        console.log(result)
        res.status(204).json({data: 'Your Item was Deleted.'})
    }catch(err) {
        console.log(err)
    }
})

module.exports = router;