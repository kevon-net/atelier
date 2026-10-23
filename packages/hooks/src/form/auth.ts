'use client';

import { getUrlParam, isProduction, validators } from '@repo/utils';
import { AuthAction } from '@repo/types';
import {
  AUTH_ROUTE,
  STORAGE_NAME,
  URL_PARAM_NAME,
  SECONDS_HOUR,
  SECONDS_MINUTE,
} from '@repo/constants';
import { useEffect, useState } from 'react';
import { getCookieClient, setCookieClient } from '@repo/utils';
import { useForm } from '@mantine/form';
import { signIn, signInCallback } from '@repo/auth';

export const useFormAuth = (params: { action: AuthAction; baseUrl: string }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [display, setDisplay] = useState<{ error?: string; message?: string } | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const form = useForm({ initialValues: { email: '', otp: '' } });

  const submitOps = {
    submitEmail: async (values: typeof form.values, options?: { resend?: boolean }) => {
      if (submitted) return;
      if (display) setDisplay(null);

      if (options?.resend) {
        let lastOtpRequestTime = getCookieClient<string>(STORAGE_NAME.AUTH.OTP_REQUEST_TIME);

        if (lastOtpRequestTime) {
          // get 1 min from previous OTP request
          const nextMinute = new Date(
            new Date(lastOtpRequestTime).getTime() + 1 * SECONDS_MINUTE * 1000,
          );

          if (new Date() < nextMinute) {
            setDisplay({ error: 'You can request code again after 1 minute.' });
            return;
          }
        }
      }

      if (step != 'email') setStep('email');

      if (options?.resend) {
        if (values.otp) form.setFieldValue('otp', '');
      }

      // manual validate
      if (!!validators.email(values.email.trim())) {
        form.setFieldError('email', true);
        setDisplay({ error: 'Invalid email format.' });
        return;
      }

      setSubmitted(true);

      setCookieClient(STORAGE_NAME.AUTH.EMAIL, values.email, {
        expiryInSeconds: SECONDS_HOUR,
        secure: isProduction(),
        sameSite: 'Lax',
      });

      setCookieClient(STORAGE_NAME.AUTH.OTP_REQUEST_TIME, new Date().toISOString(), {
        expiryInSeconds: SECONDS_HOUR,
        secure: isProduction(),
        sameSite: 'Lax',
      });

      // const response = await signIn(
      //   {
      //     values,
      //     options: { action: params.action },
      //   },
      //   `${params.baseUrl}/api`,
      // );

      // const data = await response.json();

      // setDisplay({ ...data });

      // if (!data.error) {
      //   // all well. otp sent to email. proceed to otp step.
      //   setStep('otp');
      // }

      setSubmitted(false);
    },

    submitOtp: async (values: typeof form.values) => {
      if (submitted) return;
      if (display) setDisplay(null);

      // manual validate
      if (values.otp.length != 8) {
        form.setFieldError('otp', true);
        setDisplay({ error: 'OTP must be exactly 8 characters long.' });
        return;
      }

      setSubmitted(true);

      const redirect = getUrlParam(URL_PARAM_NAME.REDIRECT) || AUTH_ROUTE.REDIRECT;
      const redirectUrl = encodeURIComponent(redirect as string);

      // const response = await signInCallback(
      //   {
      //     values,
      //     options: { action: params.action },
      //   },
      //   `${params.baseUrl}/api`,
      //   redirectUrl,
      //   params.baseUrl,
      // );

      // const data = await response.json();

      // setDisplay({ ...data });

      // if (data.error) {
      //   form.setFieldValue('otp', '');
      //   setSubmitted(false);
      // } else {
      //   // redirect after auth
      //   window.location.href = decodeURIComponent(redirectUrl);
      // }
    },
  };

  useEffect(() => {
    const savedEmail = getCookieClient(STORAGE_NAME.AUTH.EMAIL);

    if (savedEmail) {
      form.setFieldValue('email', savedEmail);

      if (step == 'otp') {
        setDisplay({ message: 'Check your email for an OTP' });
      }
    }
  }, []);

  return {
    form,
    submitted,
    submitOps,
    step,
    display,
    setDisplay,
  };
};
