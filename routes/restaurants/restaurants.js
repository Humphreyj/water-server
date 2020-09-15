const db = require('../../db')
const resto_db = require('../../models/restaurant-model');
const router = require('express').Router()
const restricted = require('../../middleware/restricted-middleware');

router.get('/', async (req,res) => {
    try{
        const results= await db.query('SELECT * FROM restaurants LEFT JOIN (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;')
        console.log(results.rows)
        console.log('user', req.session)
        res.status(200).json(results.rows)
    }catch(err) {
        res.status(500).json({message: err})
    }
  
   
})
router.get('/:id', async (req,res) => {
    try{
        const result = await db.query('SELECT * FROM restaurants LEFT JOIN (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE restaurant_id = $1',[req.params.id])
        //I guess this is a parameterized query. I don't really like how it looks so im going to revisit it.
        res.status(200).json(result.rows[0])
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

router.post('/:id/reviews',restricted, async(req, res) => {
   try {
       const newReview = await db.query('INSERT INTO reviews(users_id,restaurant_id,content,rating) values ($1,$2,$3,$4)',[req.body.users_id, req.params.id,req.body.content,req.body.rating])
       res.status(201).json(newReview.rows)
   }catch(err) {
    console.log(err)
   }
})

router.get('/:id/reviews', async(req,res) => {
    try{
        const reviews = await db.query('SELECT display_name,content,rating FROM reviews INNER JOIN users ON reviews.users_id = users.id WHERE restaurant_id = ($1)',[req.params.id])
        
        res.status(200).json(reviews.rows)
    }catch(err) {
        console.log(error)
    }
})

module.exports = router;