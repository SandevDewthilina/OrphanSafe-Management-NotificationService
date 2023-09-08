import DatabaseHandler from "../lib/database/DatabaseHandler.js";

export const broadcastNotification = async (fcmToken, title, body) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: fcmToken,
  };
  return true;
  // TODO
};

export const patchFCMToken = async ({ userId, token }) => {
  const currentToken = await DatabaseHandler.executeSingleQueryAsync(
    `SELECT * FROM "PushNotificationTokens" WHERE "UserId" = $1`,
    [userId]
  );
  if (currentToken.length === 0) {
    // not exists
    const results = await DatabaseHandler.executeSingleQueryAsync(
      `INSERT INTO "PushNotificationTokens" VALUES ($1, $2) RETURNING *;`,
      [userId, token]
    );
  } else {
    // exists
    const { UserId, Token } = currentToken[0];
    if (Token !== token) {
      const results = await DatabaseHandler.executeSingleQueryAsync(
        `UPDATE "PushNotificationTokens" SET "Token" = $1
        WHERE "UserId" = $2 RETURNING *;`,
        [token, userId]
      );
    }
  }
  return token;
};
