const express =require("express");
const router = express.Router();
const { registerUser, loginUser, getMe, updateUser, updateCart, deleteCart } = require("../controllers/userController");

// use protect function for everywhere you need to login
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/:userId', getMe)
router.put('/:userId',updateUser)
router.put('/:userId/:productId',updateCart)
router.put('/remove/:userId/:productId',deleteCart)

module.exports= router;