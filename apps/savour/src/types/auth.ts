import { SessionGet } from './models/session';
import { ProfileGet } from './models/profile';
import { AuthAction } from '@repo/types';

export type SignIn = {
  values: { email: string; otp?: string };
  options: { action?: AuthAction };
};

export type SignOut = {
  options: { baseUrl: string };
};

export type SessionCookie = SessionGet & {
  profile: ProfileGet;
};
