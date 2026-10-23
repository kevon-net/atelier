export const SHARED_VERCEL_SUBSTRING = 'atelier';
const VERCEL_TEAM_SLUG = `${SHARED_VERCEL_SUBSTRING}-team`;

const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
const gitBranch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;

export const isVercelPreview = vercelEnv === 'preview';
export const isProduction = vercelEnv
  ? vercelEnv === 'production'
  : process.env.NODE_ENV === 'production';

const cleanHost = (host?: string | null) => host?.replace(/^https?:\/\//, '') || '';

const sanitizeBranch = (branch?: string) =>
  branch ? branch.toLowerCase().replace(/[^a-z0-9-]/g, '-') : '';

const getPreviewUrl = (projectName: string) => {
  if (!gitBranch) return cleanHost(vercelUrl);
  const branchSlug = sanitizeBranch(gitBranch);
  return `${projectName}-git-${branchSlug}-${VERCEL_TEAM_SLUG}.vercel.app`;
};

export const resolveHost = (
  prodEnvHost: string | undefined,
  devEnvHost: string | undefined,
  projectName: string,
) => {
  // 1. Vercel Preview Branch
  if (isVercelPreview) {
    return getPreviewUrl(projectName);
  }

  // 2. Custom Production Domain
  if (isProduction && prodEnvHost) {
    return cleanHost(prodEnvHost);
  }

  // 3. Vercel Production Fallback
  if (vercelUrl) {
    return cleanHost(vercelUrl);
  }

  // 4. Local Development Fallback
  return isProduction ? cleanHost(prodEnvHost) : cleanHost(devEnvHost);
};

export const getUrlPrefix = (host?: string) => {
  if (!host) return 'https://';
  return host.includes('localhost') || host.includes('127.0.0.1') ? 'http://' : 'https://';
};

export const HOSTNAME_SAVOUR = resolveHost(
  process.env.NEXT_PUBLIC_HOST_SAVOUR_PROD,
  process.env.NEXT_PUBLIC_HOST_SAVOUR_DEV,
  `${SHARED_VERCEL_SUBSTRING}-savour`,
);

export const HOSTNAME_STOCKWISE = resolveHost(
  process.env.NEXT_PUBLIC_HOST_STOCKWISE_PROD,
  process.env.NEXT_PUBLIC_HOST_STOCKWISE_DEV,
  `${SHARED_VERCEL_SUBSTRING}-stockwise`,
);

export const BASE_URL = {
  SAVOUR: `${getUrlPrefix(HOSTNAME_SAVOUR)}${HOSTNAME_SAVOUR}`,
  STOCKWISE: `${getUrlPrefix(HOSTNAME_STOCKWISE)}${HOSTNAME_STOCKWISE}`,
};
