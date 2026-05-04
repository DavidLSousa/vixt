export type RequestConfig = RequestInit & {
  params?: Record<string, string>;
};

export class HttpError extends Error {
  constructor(public response: Response, public data: any) {
    super(`HTTP Error: ${response.status}`);
  }
}

export const http = {
  async request<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...init } = config;
    
    let fullUrl = url;
    if (params) {
      const searchParams = new URLSearchParams(params);
      fullUrl += `?${searchParams.toString()}`;
    }

    const response = await fetch(fullUrl, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new HttpError(response, data);
    }

    return data as T;
  },

  get<T>(url: string, config?: RequestConfig) {
    return this.request<T>(url, { ...config, method: 'GET' });
  },

  post<T>(url: string, body: any, config?: RequestConfig) {
    return this.request<T>(url, { ...config, method: 'POST', body: JSON.stringify(body) });
  },
};
