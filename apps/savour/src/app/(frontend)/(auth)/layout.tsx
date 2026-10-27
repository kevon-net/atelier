import React from 'react';
import { Center } from '@mantine/core';

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return <Center className="h-screen">{children}</Center>;
}
