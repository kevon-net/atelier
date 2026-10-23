import { useStoreNetwork } from '@repo/store';
import { getNetworkStatus } from './initialize/network';

export const useNetwork = () => {
  const online = useStoreNetwork((s) => s.network?.online);
  const setOnline = useStoreNetwork((s) => s.setOnline);

  const setOnlineStatus = async () => {
    if (online === undefined) return;
    if (online === null) return;

    const newStatus = await getNetworkStatus();
    if (!newStatus) return;
    if (newStatus.online == online) return;

    return setOnline(newStatus.online);
  };

  // possble to add useffect here to automatically update online status

  return { online, setOnlineStatus };
};
