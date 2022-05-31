const express =require("express"); // common js module
const router = express.Router();
const {listAllOrders, createOrder, readOrder, findMyOrder} = require("../controllers/orderController");
// const {protect} = require("../middleware/authMiddleware");

// router.get("/", protect, getProducts)
// router.post("/",protect, createProduct)
// router.get("/userproduct", protect, userProduct)
// router.put("/:id",protect, updateProduct)
// router.delete("/:id",protect, deleteProduct)

router.get("/", listAllOrders)
router.post("/",createOrder)

router.get("/my/:userId", findMyOrder)

router.get("/:orderId", readOrder)

module.exports = router