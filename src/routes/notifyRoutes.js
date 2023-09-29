import express from "express";
import { broadcast, syncFCMToken } from "../controllers/notifyController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/broadcast").post(protect, broadcast);
router.route("/patchToken").patch(protect, syncFCMToken);

export default router;

