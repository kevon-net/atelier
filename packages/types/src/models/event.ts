import { Prisma, Event } from '@repo/db';

// Type for creating a item (without id and relations)
export type EventCreate = Prisma.EventCreateInput;

// Type for updating a item (all fields optional except id)
export type EventUpdate = Prisma.EventUpdateInput;

// Type for default item (with id and no relations)
export type EventGet = Event;

// Type for fetched item with relations
export type EventRelations = Prisma.EventGetPayload<{
  include: {
    workspace: true;
  };
}>;

// 2. Form Types (Matches Prisma fields, but allows optional id for draft/new events)
export type EventFormData = Omit<Partial<EventGet>, 'start' | 'end'> & {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
};
