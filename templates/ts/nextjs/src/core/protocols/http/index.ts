export interface HttpProtocol {
  get<T>(url: string, config?: HttpClientRequestConfig): Promise<T>;
  put<T,D>(url: string, data?: D, config?: HttpClientRequestConfig): Promise<T>;
  post<T,D>(
    url: string,
    data?: D,
    config?: HttpClientRequestConfig,
  ): Promise<T>;
  delete<T>(url: string, config?: HttpClientRequestConfig): Promise<T>;
  patch<T,D>(
    url: string,
    data?: D,
    config?: HttpClientRequestConfig,
  ): Promise<T>;
}
export interface HttpClientRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
}
