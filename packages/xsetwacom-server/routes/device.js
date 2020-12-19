const { Router } = require("express");

const deviceController = require("../controllers/device.js");
const router = Router();

router.get("/all", deviceController.getAll);
router.get("/:id/overview", deviceController.getDeviceOverview);
router.put("/:id/MapToOutput/", deviceController.mapToOutput);

module.exports = router;
