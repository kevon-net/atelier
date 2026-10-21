'use client';

import dayjs from 'dayjs';
import { Badge, Divider, Group, Stack, Text } from '@mantine/core';
import { ScheduleEventData } from '@mantine/schedule';
import { useStoreCalendar } from '@repo/store';
import { IconClock, IconMapPin } from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';

export default function EventDetails({ event }: { event: ScheduleEventData & any }) {
  const calendar = useStoreCalendar((s) => s.calendars?.find((ci) => ci.id == event.calendarId));

  return (
    <Stack gap={'xs'} fz={'xs'} c={'dimmed'}>
      {calendar && (
        <Group gap={4} justify="end">
          <Badge size="sm" variant="light" color={calendar.color || undefined}>
            {calendar.title}
          </Badge>
        </Group>
      )}

      <div>
        <Text fw={500} size="sm" c={'var(--mantine-color-text)'}>
          {event.title}
        </Text>
      </div>

      {event.description && (
        <div>
          <Text inherit>{event.description}</Text>
        </div>
      )}

      <Divider variant="dashed" />

      <Group gap={4} c={'var(--mantine-color-text)'}>
        <IconClock size={iconSize} stroke={ICON_STROKE_WIDTH} />

        <Text inherit c={'dimmed'}>
          {dayjs(event.start).format('MMM D, YYYY HH:mm')} – {dayjs(event.end).format('HH:mm')}
        </Text>
      </Group>

      {event.location && (
        <Group gap={4} c={'var(--mantine-color-text)'}>
          <IconMapPin size={iconSize} stroke={ICON_STROKE_WIDTH} />

          <Text inherit c={'dimmed'}>
            {event.location}
          </Text>
        </Group>
      )}
    </Stack>
  );
}

const iconSize = ICON_SIZE - 6;
