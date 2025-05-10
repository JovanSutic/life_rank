import { createContext, useContext, useState, type ReactNode, type FC } from 'react';

interface MapLayoutContextType {
  showLeft: boolean;
  showRight: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
}

const MapLayoutContext = createContext<MapLayoutContextType | null>(null);

const useLayout = () => {
  const context = useContext(MapLayoutContext);
  if (!context) {
    throw new Error('useMapLayout must be used within a <MapLayout>');
  }
  return context;
};

interface MapLayoutProps {
  children: ReactNode;
}

const MapLayout: FC<MapLayoutProps> & {
  Main: FC<MapLayoutProps>;
  Left: FC<MapLayoutProps>;
  Right: FC<MapLayoutProps>;
  useLayout: () => MapLayoutContextType;
} = ({ children }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const toggleLeft = () => setShowLeft((prev) => !prev);
  const toggleRight = () => setShowRight((prev) => !prev);

  return (
    <MapLayoutContext.Provider value={{ showLeft, showRight, toggleLeft, toggleRight }}>
      <div className="w-screen h-screen flex overflow-hidden">{children}</div>
    </MapLayoutContext.Provider>
  );
};

const Left: FC<MapLayoutProps> = ({ children }) => {
  const { showLeft } = useLayout();

  return (
    <div
      className={`
        h-full overflow-hidden transition-[width] duration-[500ms] ease-in-out
        fixed md:relative top-0 left-0 z-1001
        bg-gray-100 ${showLeft ? 'w-full lg:w-[250px]' : 'w-[0px]'}
      `}
    >
      <div className="h-full bg-gray-100 w-full lg:w-[250px]">{showLeft && children}</div>
    </div>
  );
};

const Right: FC<MapLayoutProps> = ({ children }) => {
  const { showRight } = useLayout();

  return (
    <div
      className={`
        h-full overflow-hidden transition-[width] duration-[500ms] ease-in-out
        fixed md:relative top-0 right-0 z-50
        bg-gray-100 ${showRight ? 'w-full md:w-[320px]' : 'w-[0px]'}
      `}
    >
      <div className="h-full bg-gray-100 w-full md:w-[320px]">{showRight && children}</div>
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
MapLayout.useLayout = useLayout;

export default MapLayout;
