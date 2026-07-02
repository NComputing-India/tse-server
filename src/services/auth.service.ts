import axios from 'axios';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';
import { Token } from '../models/token.model.js';

export async function refreshNcToken() {
  try {
    const response = await axios({
      url: 'https://manage.ncomputing.com/nc/api/auth/v1/mobile/login',
      method: 'POST',
      data: {
        userIdentity: env.ncUsername,
        password: env.ncPassword,
        pnsNativeId: null,
        applicationType: null,
      },
    });

    const accessToken = response.data?.data?.accessToken;
    if (!accessToken) return null;

    const doc = await Token.findOneAndUpdate(
      {},
      { accessToken },
      { upsert: true, new: true },
    );

    return doc!.accessToken;
  } catch {
    return null;
  }
}

export async function signup(email: string, password: string) {
  const existing = await User.findOne({ email });
  if (existing) {
    return null;
  }

  const user = await User.create({ email, password });
  return { email: user.email, password: user.password };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email, password });
  if (!user) {
    return null;
  }

  const secret = await refreshNcToken();
  return { email: user.email, secret, tokenError: secret === null };
}
