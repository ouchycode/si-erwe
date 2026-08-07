"use client";

import { api, ApiError } from "@/lib/api";
import type { ApiMessage, AuthResponse } from "@/lib/types";

const TOKEN_KEY = "rw_admin_token";
const USER_KEY = "rw_admin_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

export function getStoredUser(): AuthResponse["user"] | null {
  return getUserSnapshot();
}

let userCache: AuthResponse["user"] | null | undefined;
const userListeners = new Set<() => void>();

function readStoredUser(): AuthResponse["user"] | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthResponse["user"];
  } catch {
    return null;
  }
}

export function getUserSnapshot(): AuthResponse["user"] | null {
  if (userCache === undefined) {
    userCache = readStoredUser();
  }
  return userCache;
}

export function subscribeUser(cb: () => void): () => void {
  userListeners.add(cb);
  return () => {
    userListeners.delete(cb);
  };
}

function invalidateUserCache(): void {
  userCache = undefined;
  userListeners.forEach((cb) => cb());
}

export function setStoredUser(user: AuthResponse["user"] | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(USER_KEY);
  }
  invalidateUserCache();
}

export function isAdminAuthed(): boolean {
  return Boolean(getToken());
}

export async function adminLogin(
  login: string,
  password: string
): Promise<AuthResponse["user"]> {
  const res = await api.post<ApiMessage<AuthResponse>>("/auth/login", { login, password });
  if (!res.data) {
    throw new ApiError("Respons login tidak valid.", 500);
  }
  const data = res.data;
  setToken(data.token);
  setStoredUser(data.user);
  return data.user;
}

export async function adminLogout(): Promise<void> {
  const token = getToken();
  if (token) {
    try {
      await api.post("/auth/logout", {}, token);
    } catch {
      // token sudah tidak valid, abaikan
    }
  }
  setToken(null);
  setStoredUser(null);
}

export async function fetchMe(): Promise<AuthResponse["user"] | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await api.get<ApiMessage<{ id: number; name: string; email: string; role: string }>>(
      "/auth/me",
      token
    );
    if (!res.data) return null;
    const user = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      role: res.data.role,
    };
    setStoredUser(user);
    return user;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      setToken(null);
      setStoredUser(null);
    }
    return null;
  }
}

const admin = {
  get: <T>(path: string) => api.get<T>(path, getToken()),
  post: <T>(path: string, body?: unknown) => api.post<T>(path, body, getToken()),
  put: <T>(path: string, body?: unknown) => api.put<T>(path, body, getToken()),
  patch: <T>(path: string, body?: unknown) => api.patch<T>(path, body, getToken()),
  delete: <T>(path: string) => api.delete<T>(path, getToken()),
};

export { admin };
