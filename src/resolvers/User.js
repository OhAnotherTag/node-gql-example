function links({ id }, args, { prisma }) {
  return prisma.user.findUnique({ where: { id: Number(id) } }).links();
}

const User = {
  links
}
export default User;
