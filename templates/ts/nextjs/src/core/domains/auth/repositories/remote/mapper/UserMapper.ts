import { UserRespData } from '../model/UserListResponse';
import { User } from '@core/domains/auth/entities';

export function mapUserRespDataToUser(data: UserRespData[]): User[] {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    username: item.username,
    email: item.email,
    address: item.address,
    phone: item.phone,
    company: item.company,
    image: item.image,
  }));
}
