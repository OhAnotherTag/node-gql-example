function newLinkSubscribe(parent, args, { pubsub }) {
  return pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

const Subscription = {
  newLink,
};

export default Subscription;
