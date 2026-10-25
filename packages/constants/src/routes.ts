export const AUTH_ROUTE = {
  SIGN_UP: `/auth/sign-up`,
  SIGN_IN: `/auth/sign-in`,
  SIGN_IN_OAUTH: { GOOGLE: `/auth/sign-in/oauth/google` },
  SIGN_IN_CALLBACK: `/auth/callback/email`,
  ERROR: `/auth/error`,
  SIGN_OUT: `/auth/sign-out`,
  SIGNED_OUT: `/auth/signed-out`,
  REDIRECT: '/',
};

export const authRoutes = [
  AUTH_ROUTE.SIGN_UP,
  AUTH_ROUTE.SIGN_IN,
  AUTH_ROUTE.ERROR,
  AUTH_ROUTE.SIGNED_OUT,

  // Add other auth routes
];

export const protectedRoutes = [
  '/admin',

  // // Add other protected routes
];
