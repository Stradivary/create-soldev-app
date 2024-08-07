import { ResponseMeta } from '@core/utils/ProcessResponse';

export interface LoginResponse {
  meta: ResponseMeta;
  data: AuthRespData;
}

export interface AuthRespData {
  username: string;
  fullName: string;
  avatarImage: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
