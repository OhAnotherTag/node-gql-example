import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/jwt";

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, { email, password }, { prisma }) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function post(parent, { url, description }, { userId, prisma, pubsub }) {
  const newLink = await prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } },
    },
  });

  pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

const Mutation = { signup, login, post };

export default Mutation;
