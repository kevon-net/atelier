import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { ScheduleEventData } from '@mantine/schedule';
import { EventFormData, EventGet } from '@repo/types';

export const useEventCrud = () => {
  const [formOpened, setFormOpened] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState<EventFormData | null>(null);
  const mobileSelectedDate = useRef<string>(dayjs().format('YYYY-MM-DD'));

  const handleTimeSlotClick = ({ slotStart, slotEnd }: { slotStart: string; slotEnd: string }) => {
    setSelectedEventData({
      title: '',
      start: new Date(slotStart),
      end: new Date(slotEnd),
      allDay: false,
    });
    setFormOpened(true);
  };

  const handleAllDaySlotClick = (slotDate: string) => {
    setSelectedEventData({
      title: '',
      start: dayjs(slotDate).startOf('day').toDate(),
      end: dayjs(slotDate).endOf('day').toDate(),
      allDay: true,
    });
    setFormOpened(true);
  };

  const handleDayClick = (date: string) => {
    setSelectedEventData({
      title: '',
      start: dayjs(date).startOf('day').toDate(),
      end: dayjs(date).endOf('day').toDate(),
      allDay: true,
    });
    setFormOpened(true);
  };

  const handleSlotDragEnd = (rangeStart: string, rangeEnd: string) => {
    setSelectedEventData({
      title: '',
      start: new Date(rangeStart),
      end: new Date(rangeEnd),
      allDay: false,
    });
    setFormOpened(true);
  };

  const handleEventClick = (event: ScheduleEventData) => {
    setSelectedEventData({
      id: String(event.id),
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
      allDay: (event as Record<string, any>).allDay ?? false,
      description: (event as Record<string, any>).description,
      location: (event as Record<string, any>).location,
      calendarId: (event as Record<string, any>).calendarId,
    });
    setFormOpened(true);
  };

  const handleCreateMobileEvent = () => {
    const selectedDate = mobileSelectedDate.current;
    setSelectedEventData({
      title: '',
      start: dayjs(selectedDate).startOf('day').toDate(),
      end: dayjs(selectedDate).endOf('day').toDate(),
      allDay: true,
    });
    setFormOpened(true);
  };

  const handleCreateEvent = (params?: { calendarId?: string }) => {
    setSelectedEventData({
      title: '',
      start: new Date(),
      end: dayjs().add(1, 'hour').toDate(),
      allDay: false,
      calendarId: params?.calendarId,
    });
    setFormOpened(true);
  };

  const closeForm = () => {
    setFormOpened(false);
  };

  const handleExitTransitionEnd = () => {
    setSelectedEventData(null);
  };

  return {
    formOpened,
    selectedEventData,
    mobileSelectedDate,
    closeForm,
    handleExitTransitionEnd,
    scheduleHandlers: {
      onTimeSlotClick: handleTimeSlotClick,
      onAllDaySlotClick: handleAllDaySlotClick,
      onDayClick: handleDayClick,
      onSlotDragEnd: handleSlotDragEnd,
      onEventClick: handleEventClick,
    },
    handleCreateMobileEvent,
    handleCreateEvent,
  };
};
