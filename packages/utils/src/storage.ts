'use client';

/**
 * Save an item to localStorage after serializing it to JSON.
 *
 * @param name - key to save under
 * @param item - value to store (any serializable object)
 */
export const saveToLocalStorage = (name: string, item: any): void => {
  if (typeof window === 'undefined') return;

  try {
    const serializedItem = JSON.stringify(item);
    localStorage.setItem(name, serializedItem);
  } catch (error) {
    console.error('---> utility error (save to local storage):', error);
  }
};

/**
 * Retrieve an item from localStorage and parse it from JSON.
 *
 * @param name - key to retrieve
 * @returns parsed object or null if missing/invalid
 */
export const getFromLocalStorage = (name: string): any | null => {
  if (typeof window === 'undefined') return null;

  try {
    const serializedItem = localStorage.getItem(name);
    return serializedItem ? JSON.parse(serializedItem) : null;
  } catch (error) {
    console.error('---> utility error (get from local storage):', error);
    return null;
  }
};

/**
 * Remove an item from localStorage.
 *
 * @param name - key to remove
 */
export const removeFromLocalStorage = (name: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error('---> utility error (remove from local storage):', error);
  }
};

/**
 * Save an item to sessionStorage after serializing it to JSON.
 *
 * @param name - key to save under
 * @param item - value to store (any serializable object)
 */
export const saveToSessionStorage = (name: string, item: any): void => {
  if (typeof window === 'undefined') return;

  try {
    const serializedItem = JSON.stringify(item);
    sessionStorage.setItem(name, serializedItem);
  } catch (error) {
    console.error('---> utility error (save to session storage):', error);
  }
};

/**
 * Retrieve an item from sessionStorage and parse it from JSON.
 *
 * @param name - key to retrieve
 * @returns parsed object or null if missing/invalid
 */
export const getFromSessionStorage = (name: string): any | null => {
  if (typeof window === 'undefined') return null;

  try {
    const serializedItem = sessionStorage.getItem(name);
    return serializedItem ? JSON.parse(serializedItem) : null;
  } catch (error) {
    console.error('---> utility error (get from session storage):', error);
    return null;
  }
};

/**
 * Remove an item from sessionStorage.
 *
 * @param name - key to remove
 */
export const removeFromSessionStorage = (name: string): void => {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(name);
  } catch (error) {
    console.error('---> utility error (remove from session storage):', error);
  }
};

type CookieOptions = {
  expiryInSeconds: number;
  sameSite?: 'Strict' | 'Lax' | 'None';
  path?: string;
  secure?: boolean; // Only sent over HTTPS
};

/**
 * Sets a cookie in the browser with optional secure flag.
 * Automatically JSON-stringifies objects and encodes values.
 */
export const setCookieClient = (name: string, value: any, options: CookieOptions): void => {
  if (typeof document === 'undefined') return;

  const cookieValue =
    value && typeof value === 'object'
      ? encodeURIComponent(JSON.stringify(value))
      : encodeURIComponent(value);

  const expires = new Date(Date.now() + options.expiryInSeconds * 1000).toUTCString();
  const sameSite = options.sameSite ?? 'Strict';
  const path = options.path ?? '/';
  const secure = options.secure ? '; Secure' : '';

  document.cookie = `${name}=${cookieValue}; expires=${expires}; SameSite=${sameSite}; path=${path}${secure}`;
};

/**
 * Retrieves a cookie value by name.
 * Attempts to parse JSON automatically.
 */
export const getCookieClient = <T = string>(name: string): T | null => {
  if (typeof document === 'undefined') return null;

  // Escaping the name is safer in case it contains special regex characters
  const escapedName = name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
  const match = document.cookie.match(new RegExp('(^| )' + escapedName + '=([^;]+)'));

  // 1. Fix: Ensure match exists before accessing index 2
  if (!match || !match[2]) return null;

  const value = decodeURIComponent(match[2]);

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
};

/**
 * Deletes a cookie by name.
 */
export const deleteCookieClient = (name: string, path: string = '/') => {
  setCookieClient(name, '', { expiryInSeconds: -1, path });
};
