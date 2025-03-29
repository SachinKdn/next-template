'use server';

interface RequestConfig extends RequestInit {
  isNotifyError?: boolean;
  bodyData?: unknown;
}

interface IResponse<T = any> {
    success: boolean;
    message?: string;
    status?: number;
    data: T;
  }

async function request<T>(
  url: string,
  config: RequestConfig = {}
): Promise<T | undefined> {
  const { isNotifyError = false, bodyData, ...restConfig } = config;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("BaseURL-", baseUrl)
  let redirectPath: string | null = null;



  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...restConfig.headers,
  };

  const requestConfig: RequestInit = {
    ...restConfig,
    headers,
  };

  if (bodyData) {
    requestConfig.body = JSON.stringify(bodyData);
  }

  try {
    const response = await fetch(`${baseUrl}${url}`, requestConfig);

    

    const result = (await response.json()) as IResponse<T>;
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }

    return result.data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (isNotifyError) {
      // Implement your error handling logic here
    }
    return undefined;
  }
}

export async function testAPI(): Promise<
  string | undefined
> {
  return request<string>('server/test');
}
