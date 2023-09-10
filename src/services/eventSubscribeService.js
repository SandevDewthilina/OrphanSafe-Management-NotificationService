import { unicastNotification } from "../services/notifyService.js";

export const subscribeEvents = async (payload) => {
  const {  event, data } = payload;
  // parse data
  console.log("Received data from notification service", data);

  // manage event
  switch (event) {
    case "UNICAST":
      const { notification, userId } = data;
      const { title, body } = notification;
      const response = await unicastNotification({title, body, userId});
      console.log("notification send response", response)
      break;
    default:
      break;
  }
};
