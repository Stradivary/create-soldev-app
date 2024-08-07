import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import {
  HttpClientRequestConfig,
  HttpProtocol,
} from '@core/protocols/http';

function normalizeUrl(url: string): string {
  // Replace double slashes with a single slash, except after the colon in http(s):
  return url.replace(/([^:]\/)\/+/g, '$1');
}

const axiosAdapter = ({
  requestInterceptor,
  refreshInterceptor
}: {
  requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
  refreshInterceptor: (config: InternalAxiosRequestConfig) => AxiosInstance,
}): HttpProtocol => {
  const axiosInstance = axios.create({
    timeout: 10000,
  });

  if (requestInterceptor) {
    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return requestInterceptor(config);
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  if (refreshInterceptor) {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest: InternalAxiosRequestConfig = error.config;
        if (error.response.status === 401 || error.response.status === 403) {
          return refreshInterceptor(originalRequest);
        }

        return Promise.reject(error);
      },
    );
  }

  return {
    get: async <T>(url: string, config?: HttpClientRequestConfig): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.get(url, config);
        return response.data;
      } catch (error) {
        return handleAxiosError<T>(error);
      }
    },
    put: async <T>(
      url: string,
      data?: any,
      config?: HttpClientRequestConfig,
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.put(
          normalizeUrl(url),
          data,
          config,
        );
        return response.data;
      } catch (error) {
        return handleAxiosError<T>(error);
      }
    },

    post: async <T>(
      url: string,
      data?: any,
      config?: HttpClientRequestConfig,
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.post(
          normalizeUrl(url),
          data,
          config,
        );
        return response.data;
      } catch (error) {
        return handleAxiosError<T>(error);
      }
    },

    delete: async <T>(
      url: string,
      config?: HttpClientRequestConfig,
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.delete(
          normalizeUrl(url),
          config,
        );
        return response.data;
      } catch (error) {
        return handleAxiosError<T>(error);
      }
    },

    patch: async <T>(
      url: string,
      data?: any,
      config?: HttpClientRequestConfig,
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await axiosInstance.patch(
          normalizeUrl(url),
          data,
          config,
        );
        return response.data;
      } catch (error) {
        return handleAxiosError<T>(error);
      }
    },
  };
};

const handleAxiosError = <T>(error: any): Promise<T> => {
  if (error && typeof error === 'object' && error.isAxiosError) {
    return Promise.reject(new Error(error.response?.data));
  }
  return Promise.reject(new Error(error));
};

export default axiosAdapter;
