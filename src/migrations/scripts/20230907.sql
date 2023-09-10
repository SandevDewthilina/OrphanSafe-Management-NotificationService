CREATE TABLE "PushNotificationTokens" (
    "UserId" uuid NOT NULL,
    "DeviceId" varchar(225) NOT NULL,
    "Token" varchar(225),  
    PRIMARY KEY ("UserId", "DeviceId","Token"),
    CONSTRAINT "FK_Users.UserId"
    FOREIGN KEY ("UserId")
    REFERENCES "User"("Id") ON DELETE CASCADE
);
