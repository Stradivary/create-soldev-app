export interface Auth {
  username: string;
  fullName: string;
  avatarImage: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
