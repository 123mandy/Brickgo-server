const express =require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, updateUser, updateCart } = require("../controllers/userController");

// use protect function for everywhere you need to login
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/:userId', getMe)
router.put('/:userId',updateUser)
router.put('/:userId/:productId',updateCart)

module.exports= router;