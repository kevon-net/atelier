export const APP_NAME = 'Savour';

export const APP_DESC = `${APP_NAME} offers a delightful dining experience with fresh, locally sourced ingredients and authentic [Cuisine Type] dishes. Reserve your table or order online today!`;

export const PHONES = {
  MAIN: '(254) 123 456-789',
};

export const EMAILS = {
  DEV: process.env.NEXT_PUBLIC_EMAIL_DEV,
  INQUIRIES: process.env.NEXT_PUBLIC_EMAIL_INQUIRIES,
  NO_REPLY: process.env.NEXT_PUBLIC_EMAIL_NOREPLY,
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
