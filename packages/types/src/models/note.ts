import { Prisma, Note } from '@repo/db';

// Type for creating a item (without id and relations)
export type NoteCreate = Prisma.NoteCreateInput;

// Type for updating a item (all fields optional except id)
export type NoteUpdate = Prisma.NoteUpdateInput;

// Type for default item (with id and no relations)
export type NoteGet = Note;

// Type for fetched item with relations
export type NoteRelations = Prisma.NoteGetPayload<{
  include: {
    _count: { select: { linksFrom: true; linksTo: true; profile: true; tags: true } };
  };
}>;
