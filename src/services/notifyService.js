import DatabaseHandler from "../lib/database/DatabaseHandler.js";
import {getMessaging} from 'firebase-admin/messaging'

export const broadcastNotification = async ({title, body}) => {
  const allTokens = await DatabaseHandler.executeSingleQueryAsync(
    `SELECT DISTINCT "Token" FROM "PushNotificationTokens"`,
    []
  );
  const tokenArray = allTokens.map((item) => item.Token);
  const message = {
    notification: {
      title: title,
      body: body
    },
    tokens: tokenArray
  }

  const response = await getMessaging().sendEachForMulticast(message);
  const failedTokens = [];
  const successTokens = []

  if (response.failureCount > 0) {
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokens.push(tokenArray[idx]);
      } else {
        successTokens.push(tokenArray[idx])
      }
    });
  }

  return {
    response: response,
    successTokens: successTokens,
    failedTokens: failedTokens
  };
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
