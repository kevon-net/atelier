import { Center } from '@mantine/core';
import { LayoutSection } from '../../layout/section';
import { LoaderMain } from '../../loader/main';

export function PartialLoadingPage() {
  return (
    <LayoutSection id={'loading-main'}>
      <Center mih={'100vh'}>
        <LoaderMain />
      </Center>
    </LayoutSection>
  );
}
