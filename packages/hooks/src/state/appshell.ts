import { useStoreAppshell } from '@repo/store';

export const useAppshell = () => {
  const navbar = useStoreAppshell((s) => s.appshell?.navbar);
  const toggleNavbar = useStoreAppshell((s) => s.toggleNavbar);
  const aside = useStoreAppshell((s) => s.appshell?.aside);
  const toggleAside = useStoreAppshell((s) => s.toggleAside);

  const handleToggleNavbar = () => {
    if (navbar === undefined) return;
    if (navbar === null) return;

    toggleNavbar();
  };

  const handleToggleAside = () => {
    if (aside === undefined) return;
    if (aside === null) return;

    toggleAside();
  };

  // add useffect to handle change sync to client storage

  return { navbar, handleToggleNavbar, aside, handleToggleAside };
};
