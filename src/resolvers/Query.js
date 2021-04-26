async function feed(parent, { filter, skip, take, orderBy }, { prisma }) {
  const where = filter
    ? {
        OR: [
          { description: { contains: filter } },
          { url: { contains: filter } },
        ],
      }
    : {};

  const links = await prisma.link.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  const count = await prisma.link.count({ where });

  return { links, count };
}

const Query = {
  feed,
};

export default Query;
