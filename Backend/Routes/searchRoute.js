const express = require("express");
const router = express.Router();

const {
  searchAll,
  getAllProducts,
  getAllProductsPage,
} = require("../Controller/searchController");

router.get("/", searchAll);
router.get("/page",getAllProductsPage)
router.get("/all", getAllProducts);

module.exports = router;
