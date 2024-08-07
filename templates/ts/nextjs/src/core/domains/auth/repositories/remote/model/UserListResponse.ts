import { ResponseMeta } from '@core/utils/ProcessResponse';

export interface UserListReponse {
  meta: ResponseMeta;
  data: UserRespData[];
}

export interface UserRespData {
  id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  company: string;
  image: string;
}
