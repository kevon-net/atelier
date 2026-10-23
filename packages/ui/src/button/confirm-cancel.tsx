'use client';

import { Button, ButtonGroup } from '@mantine/core';

export function ButtonGroupConfirmCancel({
  options,
}: {
  options: { onConfirm: () => void; onCancel: () => void };
}) {
  return (
    <ButtonGroup>
      <Button variant="default" onClick={options.onCancel}>
        Cancel
      </Button>

      <Button onClick={options.onConfirm}>Confirm</Button>
    </ButtonGroup>
  );
}
