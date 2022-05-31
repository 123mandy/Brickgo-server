const express =require("express"); // common js module
const router = express.Router();
const { listAllProducts, createProduct, readProduct, updateProduct, deleteProduct, findMyProduct} = require("../controllers/productController");
// const {protect} = require("../middleware/authMiddleware");

// router.get("/", protect, getProducts)
// router.post("/",protect, createProduct)
// router.get("/userproduct", protect, userProduct)
// router.put("/:id",protect, updateProduct)
// router.delete("/:id",protect, deleteProduct)

router.get("/", listAllProducts)
router.post("/",createProduct)

router.get("/:userId", findMyProduct)

router.get("/:productId", readProduct)
router.put("/:productId",updateProduct)
router.delete("/:productId",deleteProduct)


module.exports = router

