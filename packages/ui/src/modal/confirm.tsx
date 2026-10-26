'use client';

import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Text } from '@mantine/core';
import { LayoutModal } from '../layout/modal';
import { Alert, Variant } from '@repo/types';
import { ButtonGroupConfirmCancel } from '../button/confirm-cancel';
import { useNotification } from '@repo/notifications';

export type ConfirmProps = {
  title?: string;
  desc?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  variant?: Alert;
};

export interface ModalConfirmProps extends ConfirmProps {
  children: React.ReactNode;
}

export function ModalConfirm({
  title = 'Confirm Action',
  desc = 'Are you sure you want to proceed?',
  onCancel,
  onConfirm,
  variant = Alert.WARNING,
  children,
}: ModalConfirmProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { showNotification } = useNotification();

  const handleCancel = () => {
    onCancel?.();
    showNotification({
      title: 'Action Canceled',
      desc: 'The action has been aborted.',
      variant: Variant.WARNING,
    });
    close();
  };

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleCancel} pos="relative" withCloseButton={false}>
        <LayoutModal title={title} onClose={handleCancel} variant={variant}>
          <div>
            <Text>{desc}</Text>
          </div>

          <ButtonGroupConfirmCancel
            options={{ onCancel: handleCancel, onConfirm: handleConfirm }}
          />
        </LayoutModal>
      </Modal>

      {/* Trigger wrapper */}
      <span onClick={open} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {children}
      </span>
    </>
  );
}
