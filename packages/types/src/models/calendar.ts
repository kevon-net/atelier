import { Prisma, Calendar } from '@repo/db';

// Type for creating a item (without id and relations)
export type CalendarCreate = Prisma.CalendarCreateInput;

// Type for updating a item (all fields optional except id)
export type CalendarUpdate = Prisma.CalendarUpdateInput;

// Type for default item (with id and no relations)
export type CalendarGet = Calendar;

// Type for fetched item with relations
export type CalendarRelations = Prisma.CalendarGetPayload<{
  include: {
    workspace: true;
  };
}>;
