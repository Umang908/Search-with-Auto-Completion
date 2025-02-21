const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get("/", searchController.getSearchSuggestions);
router.post("/", searchController.trackSearchTerm);

module.exports = router;