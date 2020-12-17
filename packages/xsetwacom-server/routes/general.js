const { Router } = require("express");

const generalController = require("../controllers/general.js");
const router = Router();

router.get("/support", generalController.getSupport);

module.exports = router;
