import { useAppSelector } from "../hooks/useAppSelector";
import { selectSessionCsrf } from "../redux/slices/sessionSlice";

const BASE_URL = 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
  url: string;
  data?: any;
}

async function apiService<T>(options: RequestOptions): Promise<T> {
  const { url, data, ...otherOptions } = options;
  const csrfToken = useAppSelector(selectSessionCsrf);
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken || '',
    ...otherOptions.headers,
  });

  const response = await fetch(`${BASE_URL}${url}`, {
    ...otherOptions,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}

export default apiService;
