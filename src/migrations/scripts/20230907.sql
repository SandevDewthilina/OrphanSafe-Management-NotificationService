CREATE TABLE "PushNotificationTokens" (
    "UserId" uuid NOT NULL,
    "Token" varchar(225),  
    PRIMARY KEY ("UserId", "Token"),
    CONSTRAINT "FK_Users.UserId"
    FOREIGN KEY ("UserId")
    REFERENCES "User"("Id") ON DELETE CASCADE
);
