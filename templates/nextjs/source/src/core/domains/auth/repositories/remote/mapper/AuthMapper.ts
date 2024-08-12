import { Auth } from '@core/domains/auth/entities';
import { AuthRespData } from '../model/LoginResponse';

export function mapAuthRespDataToAuth(data: AuthRespData): Auth {
  return {
    username: data.username,
    fullName: data.fullName,
    avatarImage: data.avatarImage,
    token: data.token,
    refreshToken: data.refreshToken,
    expiresIn: data.expiresIn,
  };
}
