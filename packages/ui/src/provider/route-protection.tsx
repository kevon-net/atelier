'use client';

import { AUTH_ROUTE, protectedRoutes } from '@repo/constants';
import { useStoreAuth } from '@repo/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authRoutes } from '@repo/constants';
import { Center } from '@mantine/core';
import { SpinnerApp } from '../spinner/app';

export function ProviderRouteProtection({ children }: { children: React.ReactNode }) {
  const user = useStoreAuth((s) => s.user);
  const isLoading = useStoreAuth((s) => s.isLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Helper checks
    const isAuthRoute = authRoutes.some((ar) => pathname.includes(ar));
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // Rule 1: Authenticated user trying to access an auth route -> Redirect to home/redirect
    if (user && isAuthRoute) {
      router.replace(AUTH_ROUTE.REDIRECT);
    }
    // Rule 2: Unauthenticated user trying to access a protected route -> Redirect to sign-in
    else if (!user && isProtectedRoute) {
      router.replace(AUTH_ROUTE.SIGN_IN);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <Center className="h-screen">
        <SpinnerApp />
      </Center>
    );
  }

  // Prevent flashing content while redirecting
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if ((!user && isProtectedRoute) || (user && isAuthRoute)) {
    return null;
  }

  return <>{children}</>;
}
