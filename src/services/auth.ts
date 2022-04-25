import config from '../config';
import { makeUserStore, User } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userStore = makeUserStore();

async function createAccount(
  user: Omit<User, 'id'>
): Promise<{ id: number; username: string; token: string }> {
  if (!config.SALT_ROUNDS || !config.TOKEN_SECRET) {
    throw new Error('Missing env variable');
  }
  const hashedPassword: string = await bcrypt.hash(
    user.password + config.BCRYPT_PASSWORD,
    Number(config.SALT_ROUNDS)
  );
  user.password = hashedPassword;
  const createdUser: User = await userStore.create(user);

  const token: string = jwt.sign(
    {
      id: createdUser.id,
      username: createdUser.username,
    },
    config.TOKEN_SECRET
  );

  return {
    id: createdUser.id,
    username: createdUser.username,
    token,
  };
}

async function login(
  username: string,
  password: string
): Promise<{ username: string; token: string }> {
  if (!config.TOKEN_SECRET || !config.BCRYPT_PASSWORD) {
    throw new Error('Missing env variable');
  }

  const storedUser = await userStore.getUser(username);
  const storedPassword = storedUser.password;
  const validLogin = await bcrypt.compare(
    password + config.BCRYPT_PASSWORD,
    storedPassword
  );
  if (!validLogin) {
    throw new Error('Bad credentials');
  }
  const token = jwt.sign(
    { id: storedUser.id, username: storedUser.username },
    config.TOKEN_SECRET
  );

  return { username: storedUser.username, token };
}

function verfiy(token: string) {
  if (!config.TOKEN_SECRET) throw new Error('Missing env variable');
  return jwt.verify(token, config.TOKEN_SECRET);
}

export function makeAuthServices() {
  return {
    createAccount,
    login,
    verfiy,
  };
}
