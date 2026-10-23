import { Prisma, Inquiry } from '@savour/generated/prisma/client';

// Type for creating a item (without id and relations)
export type InquiryCreate = Prisma.InquiryCreateInput;

// Type for updating a item (all fields optional except id)
export type InquiryUpdate = Prisma.InquiryUpdateInput;

// Type for default item (with id and no relations)
export type InquiryGet = Inquiry;

// Type for fetched item with relations
export type InquiryRelations = Prisma.InquiryGetPayload<{
  include: {
    profile: true;
  };
}>;
