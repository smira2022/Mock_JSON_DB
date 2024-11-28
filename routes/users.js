const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {readData} = require('../utils/file');

//Middleware to parse incoming json to native js objects
router.use(express.json());

//Middleware to parse url-encoded strings
router.use(express.urlencoded({extended: true}));

//create new user route
router.post("/users", userController.createUser);

//update user
router.post("/users/:id/update", userController.updateUser);

//delete user
router.post("/users/:id/delete", userController.deleteUser);

//Create a API endpoint that exposes the data
router.get('/api/v1/users', async (req, res) => {
    try {
        const data = await readData(); 
        res.json(data);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    } 
});


//Render the view
router.get('/', (req, res) => {
    res.render("home");
});


module.exports = router;