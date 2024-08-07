import { Env } from "@utils/env";

export const AuthEndpoint = {
  login: `${Env.BASE_URL}/login`,
  getListUser: `${Env.BASE_URL}/users`,
  refreshToken:`${Env.BASE_URL}/refresh-token`
};
