const { Router } = require("express");

const screenController = require("../controllers/screen.js");
const router = Router();

router.get("/all", screenController.getScreens);
router.get("/monitors", screenController.getMonitors);
// router.get("/:id/overview", screenController.getDisplayOverview);

module.exports = router;
