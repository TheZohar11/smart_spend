import bcrypt from "bcrypt";

export async function checkUserPassword(userHashedPassword, password) {
  return await bcrypt.compare(password, userHashedPassword);
}
