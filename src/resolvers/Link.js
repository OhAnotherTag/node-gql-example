function postedBy({ id }, args, { prisma }) {
  return prisma.link.findUnique({ where: { id: Number(id) } }).postedBy();
}
const Link = {
  postedBy,
};

export default Link
