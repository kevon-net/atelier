'use client';

import { getUrlParam, validators } from '@repo/utils';
import { AUTH_ROUTE, URL_PARAM_NAME } from '@repo/constants';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { supabase } from '@repo/cloudbase';

export const useFormAuth = () => {
  const router = useRouter();

  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [display, setDisplay] = useState<{ error?: string; message?: string } | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const form = useForm({ initialValues: { email: '', token: '' } });

  // Step 1: Request Email OTP (Auto-creates account if new)
  const handleRequestOtp = async (e: React.FormEvent, options?: { resend?: boolean }) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);

    const formValues = form.getValues();

    if (step != 'request') setStep('request');

    if (options?.resend) {
      if (formValues.token.trim().length > 0) form.setFieldValue('token', '');
    }

    // manual validate
    if (!!validators.email(formValues.email.trim())) {
      form.setFieldError('email', true);
      // setDisplay({ error: 'Invalid email format.' });
      setSubmitted(false);
      return;
    }

    setDisplay(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: formValues.email,
      options: {
        // If enable_confirmations is false in config.toml, this logs them in immediately.
        // If true, it sends a 6-digit token to their email.
        shouldCreateUser: true,
      },
    });

    if (error) {
      setDisplay({ error: error.message });
      if (options?.resend) setStep('verify');
    } else {
      setDisplay({
        message: `An OTP has been sent. Remember to check junk/spam folder.`,
      });
      setStep('verify');
    }

    setSubmitted(false);
  };

  // Step 2: Verify the 6-digit OTP token
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);

    const formValues = form.getValues();

    // manual validate
    if (formValues.token.length != 6) {
      form.setFieldError('token', true);
      // setDisplay({ error: 'OTP must be exactly 8 characters long.' });
      setSubmitted(false);
      return;
    }

    setDisplay(null);

    const { error } = await supabase.auth.verifyOtp({
      email: formValues.email,
      token: formValues.token,
      type: 'email',
    });

    if (error) {
      setDisplay({ error: error.message });
    } else {
      const redirect = getUrlParam(URL_PARAM_NAME.REDIRECT) as string | null;
      const redirectUrl = redirect ? decodeURIComponent(redirect) : AUTH_ROUTE.REDIRECT;

      router.replace(redirectUrl);
    }

    setSubmitted(false);
  };

  return {
    form,
    submitted,
    step,
    setStep,
    display,
    setDisplay,
    handleRequestOtp,
    handleVerifyOtp,
  };
};
