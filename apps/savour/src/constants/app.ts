export const BRAND_NAME = 'Atelier';

export const APP_NAME = {
  WEB: BRAND_NAME,
};

export const APP_DESC = {
  WEB: 'The Atelier API layer provides centralized business capabilities, data access, authentication, and communication patterns used across Atelier products.',
};

export const PHONES = {
  MAIN: '(254) 123 456-789',
};

export const EMAILS = {
  DEV: process.env.NEXT_PUBLIC_EMAIL_DEV,
  DELIVERY: process.env.NEXT_PUBLIC_EMAIL_DELIVERY,
  NO_REPLY: process.env.NEXT_PUBLIC_EMAIL_NOREPLY,
  INFO: process.env.NEXT_PUBLIC_EMAIL_INFO,
  SUPPORT: process.env.NEXT_PUBLIC_EMAIL_SUPPORT,
  NEWSLETTER: process.env.NEXT_PUBLIC_EMAIL_NEWSLETTER,
};

export const BUSINESS_HOURS = {
  DAYS: 'Mon - Fri',
  TIMES: '8 AM - 5 PM',
};

export const LOCATIONS = {
  MAIN: {
    LOCATION: '410 Terry Ave. North, Seattle, WA 98109',
    PIN: '#map-pin',
  },
};

export const SOCIALS = {
  X: {
    label: `X`,
    link: '#twitter',
  },
  FB: {
    label: `Facebook`,
    link: '#facebook',
  },
  IG: {
    label: `Instagram`,
    link: '#instagram',
  },
  LI: {
    label: `LinkedIn`,
    link: '#linkedin',
  },
};
