import { useState, useEffect } from 'react';
import type { Device } from '../types/map.types';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<Device | null>(null);

  useEffect(() => {
    const getDeviceType = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (/mobile/i.test(userAgent)) {
        return 'mobile';
      }

      if (/tablet|ipad/i.test(userAgent)) {
        return 'tablet';
      }

      return 'desktop';
    };

    setDeviceType(getDeviceType());
  }, []);

  return deviceType;
};

export default useDeviceType;
