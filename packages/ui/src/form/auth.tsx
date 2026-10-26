'use client';

import React from 'react';
import { useFormAuth } from '@repo/hooks';
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Divider,
  Group,
  PinInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import classes from './auth.module.css';
import { AnchorNextLink } from '../anchor/next-link';
import {
  IconAlertTriangle,
  IconBackspace,
  IconBrandGoogle,
  IconChevronRight,
  IconInfoCircle,
  IconLogin2,
  IconMail,
} from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE, icons } from '@repo/constants';
import { ImageDefault } from '../image/default';

export function FormAuth() {
  const {
    form,
    display,
    setDisplay,
    step,
    setStep,
    handleGoogleLogin,
    handleRequestOtp,
    handleVerifyOtp,
    submitted,
  } = useFormAuth();

  const alertProps = {
    icon: display?.message ? IconInfoCircle : display?.error ? IconAlertTriangle : undefined,
  };

  const emailLength = form.values.email.trim().length;

  return (
    <Stack>
      <Stack>
        <Button
          variant="default"
          onClick={handleGoogleLogin}
          loading={submitted && emailLength == 0}
          disabled={submitted && emailLength > 0}
          leftSection={
            <ImageDefault
              src={icons.google}
              alt={'Continue with Google'}
              height={20}
              width={20}
              fit="contain"
            />
          }
        >
          Continue with Google
        </Button>
      </Stack>

      <Divider label={'or'} />

      <Box component="form" noValidate onSubmit={handleRequestOtp}>
        <Stack>
          <TextInput
            withAsterisk
            aria-label="Your email"
            placeholder="Your email"
            key={form.key('email')}
            {...form.getInputProps('email')}
            classNames={classes}
            disabled={step != 'request'}
            leftSection={<IconMail size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
            rightSection={
              <ActionIcon
                size={ICON_WRAPPER_SIZE}
                color="red"
                variant="subtle"
                display={step == 'request' && emailLength > 0 ? undefined : 'none'}
              >
                <IconBackspace size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />
              </ActionIcon>
            }
          />

          <Group justify="center" display={step == 'request' ? undefined : 'none'}>
            <Button
              type="submit"
              rightSection={<IconChevronRight size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
              fullWidth
              loading={submitted && emailLength > 0}
              disabled={submitted && emailLength == 0}
            >
              {submitted ? 'Sending Code...' : 'Continue with Email'}
            </Button>
          </Group>
        </Stack>
      </Box>

      <Box display={display?.message || display?.error ? undefined : 'none'}>
        <Alert
          color={display?.message ? 'blue' : display?.error ? 'red' : 'pri'}
          icon={
            alertProps.icon ? (
              <alertProps.icon size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />
            ) : undefined
          }
        >
          {display?.message || display?.error}
        </Alert>
      </Box>

      <Group justify="center" display={step == 'verify' ? undefined : 'none'}>
        <Text fz={'sm'} c={'dimmed'} ta={'center'}>
          Wrong email?{' '}
          <AnchorNextLink
            href={'#'}
            td={'underline'}
            onClick={(e) => {
              e.preventDefault();
              setStep('request');
              setDisplay(null);
              form.reset();
            }}
          >
            Use different email
          </AnchorNextLink>
          .
        </Text>
      </Group>

      <Box
        component="form"
        noValidate
        onSubmit={handleVerifyOtp}
        display={step == 'verify' ? undefined : 'none'}
      >
        <Stack>
          <Group justify="center">
            <PinInput
              aria-label="Your token"
              key={form.key('token')}
              {...form.getInputProps('token')}
              length={6}
              type={'number'}
              classNames={classes}
            />
          </Group>

          <Group justify="center" grow gap={'xs'}>
            <Button
              size="xs"
              variant="default"
              onClick={(e) => handleRequestOtp(e, { resend: true })}
            >
              Resend Code
            </Button>

            <Button
              size="xs"
              type="submit"
              rightSection={<IconLogin2 size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
            >
              {submitted ? 'Verifying...' : 'Verify & Sign In'}
            </Button>
          </Group>
        </Stack>
      </Box>
    </Stack>
  );
}
