import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE } from '@repo/constants';
import { Alert } from '@repo/types';
import { ActionIcon, Group, Stack, ThemeIcon, Title } from '@mantine/core';
import {
  Icon,
  IconAlertCircle,
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import React from 'react';

// 1. Static config map replaces switch statement
const ALERT_CONFIG = {
  [Alert.INFO]: { icon: IconInfoCircle, color: 'blue' },
  [Alert.WARNING]: { icon: IconAlertTriangle, color: 'yellow' },
  [Alert.DANGER]: { icon: IconAlertCircle, color: 'red' },
  [Alert.SUCCESS]: { icon: IconCheck, color: 'green' },
} as const;

// 2. Flattened props structure (idiomatic React)
interface LayoutModalProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  variant?: Alert;
  size?: string;
}

export function LayoutModal({ children, title, onClose, variant }: LayoutModalProps) {
  // Simple lookup for alert config
  const alertConfig = variant ? ALERT_CONFIG[variant] : null;
  const AlertIcon = alertConfig?.icon;

  return (
    <Stack pos="relative" gap={variant ? 'xl' : 'md'} p={0}>
      {/* Header action bar */}
      {(AlertIcon || onClose) && (
        <Group justify={AlertIcon ? 'space-between' : 'end'} align="start">
          {AlertIcon && (
            <ThemeIcon size={ICON_WRAPPER_SIZE * 2} variant="light" color={alertConfig.color}>
              <AlertIcon size={ICON_SIZE * 2} stroke={ICON_STROKE_WIDTH} />
            </ThemeIcon>
          )}

          {onClose && (
            <ActionIcon size={ICON_WRAPPER_SIZE} onClick={onClose} variant="default">
              <IconX size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />
            </ActionIcon>
          )}
        </Group>
      )}

      {/* Content body */}
      <Stack>
        {title && (
          <Title order={1} fz="xl" lh={1} ta={{ base: 'center', xs: 'start' }}>
            {title}
          </Title>
        )}

        {children}
      </Stack>
    </Stack>
  );
}
