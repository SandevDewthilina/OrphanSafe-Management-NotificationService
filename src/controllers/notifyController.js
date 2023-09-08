import asyncHandler from "express-async-handler";
import DatabaseHandler from "../lib/database/DatabaseHandler.js";
import {
  broadcastNotification,
  patchFCMToken,
} from "../services/notifyService.js";
import {
  getChannel,
  publishMessage,
  subscribeMessage,
} from "../lib/rabbitmq/index.js";

// @desc notification broadcast
// route POST /api/notifications/broadcast
// @access Private
export const broadcast = asyncHandler(async (req, res) => {
  await broadcastNotification(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Notification broadcasted" });
});

// @desc notification broadcast
// route POST /api/notifications/broadcast
// @access Private
export const syncFCMToken = asyncHandler(async (req, res) => {
  const latestToken = await patchFCMToken(req.body);
  return res.status(200).json({
    success: true,
    latestToken: latestToken,
    message: "FCM token patched",
  });
});
