// Use the direct backend URL when available so the browser sends cookies itself
// rather than relying on the Next.js proxy to forward them.
// NEXT_PUBLIC_API_URL: https://api.labs.trevoros.com/api (set in .env.local + deployment env)
// Falls back to the Next.js proxy (/api) if the var isn't available at build time.
const API_BASE = process.env.NEXT_PUBLIC_API_URL
  || (typeof window !== 'undefined' ? '/api' : 'http://localhost:4000/api');

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function api<T = unknown>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, timeoutMs = 8000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const config: RequestInit = {
    method,
    credentials: 'include',
    signal: controller.signal,
    // Only set Content-Type for requests with a body — sending it on GET/HEAD
    // triggers a CORS preflight that can fail with strict server configs.
    headers: body ? { 'Content-Type': 'application/json', ...headers } : { ...headers },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, config);
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out', 0);
    }
    throw new ApiError('Network error — is the backend running?', 0);
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(
      data.message || `Request failed with status ${response.status}`,
      response.status,
      data
    );
  }

  if (response.status === 204) return {} as T;
  return response.json();
}

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api('/auth/register', { method: 'POST', body: data }),

  login: (data: { email: string; password: string }) =>
    api('/auth/login', { method: 'POST', body: data }),

  logout: () => api('/auth/logout', { method: 'POST' }),

  me: (opts?: Pick<ApiOptions, 'timeoutMs'>) => api('/auth/me', opts),
};

// Applications API
export const applicationsApi = {
  create: (data: {
    track: string;
    motivation: string;
    experience?: string;
    portfolio?: string;
    github?: string;
    college?: string;
    degree?: string;
    graduationYear?: string;
    batchDate?: string;
    phone?: string;
  }) =>
    api('/applications', { method: 'POST', body: data }),

  list: (params?: { status?: string; track?: string }) => {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return api(`/applications${query}`);
  },

  getMy: () => api('/applications/me'),

  getById: (id: string) => api(`/applications/${id}`),

  updateStatus: (id: string, data: { status: string; adminNotes?: string }) =>
    api(`/applications/${id}/status`, { method: 'PATCH', body: data }),
};

// Payments API
export const paymentsApi = {
  createOrder: (data: { amount: number }) =>
    api('/payments/create-order', { method: 'POST', body: data }),

  verifyPayment: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
    api('/payments/verify', { method: 'POST', body: data }),

  getByUser: (userId: string) => api(`/payments/${userId}`),

  getAll: () => api('/payments/all'),
};

// Programs API
export const programsApi = {
  list: () => api('/programs'),
  create: (data: unknown) => api('/programs', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => api(`/programs/${id}`, { method: 'PATCH', body: data }),
};

// Enrollments API
export const enrollmentsApi = {
  create: (data: { userId: string; programId: string }) =>
    api('/enrollments/student', { method: 'POST', body: data }),

  getByUser: (userId: string) => api(`/enrollments/${userId}`),

  getAll: () => api('/enrollments/all'),

  updateStatus: (id: string, data: { status: string }) =>
    api(`/enrollments/${id}/status`, { method: 'PATCH', body: data }),
};

// Certificates API
export const certificatesApi = {
  generate: (data: { userId: string; performance: string; programName: string }) =>
    api('/certificates/generate', { method: 'POST', body: data }),

  verify: (code: string) => api(`/certificates/${code}`),

  getByUser: (userId: string) => api(`/certificates/user/${userId}`),

  getAll: () => api('/certificates/all'),
};

// Performance API
export const performanceApi = {
  getByUser: (userId: string) => api(`/performance/${userId}`),

  update: (userId: string, data: unknown) =>
    api(`/performance/${userId}`, { method: 'PATCH', body: data }),
};

// Batches API
export const batchesApi = {
  list: () => api('/batches'),
  active: (track: string) => api(`/batches/active/${track}`),
  create: (data: {
    name: string;
    track: string;
    startDate: string;
    endDate: string;
    whatsappLink: string;
    isActive?: boolean;
  }) => api('/batches', { method: 'POST', body: data }),
  update: (id: string, data: Partial<{
    name: string;
    track: string;
    startDate: string;
    endDate: string;
    whatsappLink: string;
    isActive: boolean;
  }>) => api(`/batches/${id}`, { method: 'PATCH', body: data }),
  remove: (id: string) => api(`/batches/${id}`, { method: 'DELETE' }),
};

// Admin API
export const adminApi = {
  stats: () => api('/admin/stats'),
  users: () => api('/admin/users'),
};

export { api, ApiError };
export default api;
