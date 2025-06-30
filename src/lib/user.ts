import { compareSync } from "bcrypt-ts";
import { dataBase } from "./prisma";

interface User {
  email: string;
  name: string;
  password?: string;
}

const findUserByCredentials = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await dataBase.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatches = compareSync(password, user.password);

  if (passwordMatches) {
    return {
      email: user.email,
      name: user.name,
    };
  }

  return null;
};

export default findUserByCredentials;
