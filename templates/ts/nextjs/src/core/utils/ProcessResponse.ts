import { HttpProtocol } from '@core/protocols';
import { DomainResult, failure, success, technicalError } from './DomainResult';

export interface ResponseMeta {
  code: number;
  message: string;
}

export interface Response<T> {
  meta: ResponseMeta;
  data: T;
}



export function processResponse<T, U>(
  response: Response<T>,
  mapper: (data: T) => U,
): DomainResult<U> {
  const { meta, data } = response;
  if (meta.code === 200) {
    return success(mapper(data));
  } else {
    return technicalError(meta.code, meta.message);
  }
}


type ApiRequestOptions<T, U, D> = {
  apiRequest: HttpProtocol;
  endpoint: string;
  method: 'get' | 'post';
  reqBody?: D;
  mapper?: (data: T) => U;
  errorMessage?: string;
};

export async function handleApiRequest<T, U, D>(
  { apiRequest, endpoint, method, reqBody,
    mapper = (data: T) => data as unknown as U,
    errorMessage = 'Api Request Failed'
  }: ApiRequestOptions<T, U, D>
): Promise<DomainResult<U>> {
  try {
    const response: Response<T> = await (method === 'get'
      ? apiRequest.get(endpoint)
      : apiRequest.post(endpoint, reqBody));

    return processResponse(response, mapper);
  } catch (error) {
    return failure(`${errorMessage}: ${error}`);
  }
}