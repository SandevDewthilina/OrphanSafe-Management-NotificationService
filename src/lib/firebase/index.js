import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

export const initializeFirebase = () => {
  initializeApp({
    credential: applicationDefault(),
    projectId: "orphansafe-mangement-frontend",
  });
};
