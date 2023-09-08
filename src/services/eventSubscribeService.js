export const subscribeEvents = (payload) => {
  // parse data
  payload = JSON.parse(data.content.toString());

  const { event, data } = payload;

  // manage event
  switch (event) {
    case "BROADCAST":
      break;
    default:
      break;
  }
};
