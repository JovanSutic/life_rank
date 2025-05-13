import type { ReactNode, FC } from 'react';
import { useMapStore } from '../stores/mapStore'; // Adjust path

interface MapLayoutProps {
  children: ReactNode;
}

const MapLayout: FC<MapLayoutProps> & {
  Main: FC<MapLayoutProps>;
  Left: FC<MapLayoutProps>;
  Right: FC<MapLayoutProps>;
} = ({ children }) => {
  return <div className="w-screen h-screen flex overflow-hidden m-0">{children}</div>;
};

const Left: FC<MapLayoutProps> = ({ children }) => {
  const leftOpen = useMapStore((state) => state.leftOpen);

  return (
    <div
      className={`
        h-full overflow-hidden transition-[width] duration-[500ms] ease-in-out
        fixed md:relative top-0 left-0 z-1001
        bg-gray-100 ${leftOpen ? 'w-full lg:w-[250px]' : 'w-[0px]'}
      `}
    >
      <div className="h-full bg-gray-100 w-full lg:w-[250px] m-0">{leftOpen && children}</div>
    </div>
  );
};

const Right: FC<MapLayoutProps> = ({ children }) => {
  const rightOpen = useMapStore((state) => state.rightOpen);
  return (
    <div
      className={`
        h-full overflow-hidden transition-[width] duration-[500ms] ease-in-out
        bg-gray-100 
        fixed md:relative top-0 right-0 z-1001
        ${rightOpen ? 'w-full lg:w-[320px]' : 'w-[0px]'}
      `}
    >
      <div className="h-full bg-gray-100 w-full lg:w-[320px]">{rightOpen && children}</div>
    </div>
  );
};

const Main: FC<MapLayoutProps> = ({ children }) => {
  return (
    <div className="flex-grow h-full transition-all duration-[1500ms] ease-in-out">{children}</div>
  );
};

MapLayout.Main = Main;
MapLayout.Left = Left;
MapLayout.Right = Right;

export default MapLayout;
