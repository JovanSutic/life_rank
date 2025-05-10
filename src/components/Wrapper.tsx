import { createContext, useContext, useState, type ReactNode, type FC } from 'react';

interface WrapperContextType {
  showLeft: boolean;
  showRight: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
}

const WrapperContext = createContext<WrapperContextType | null>(null);

const useWrapper = () => {
  const context = useContext(WrapperContext);
  if (!context) {
    throw new Error('useWrapper must be used within a <Wrapper>');
  }
  return context;
};

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> & {
  Main: FC<WrapperProps>;
  Left: FC<WrapperProps>;
  Right: FC<WrapperProps>;
  useWrapper: () => WrapperContextType;
} = ({ children }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const toggleLeft = () => setShowLeft((prev) => !prev);
  const toggleRight = () => setShowRight((prev) => !prev);

  return (
    <WrapperContext.Provider value={{ showLeft, showRight, toggleLeft, toggleRight }}>
      <div className="w-screen h-screen flex overflow-hidden">{children}</div>
    </WrapperContext.Provider>
  );
};

const Left: FC<WrapperProps> = ({ children }) => {
  const { showLeft } = useWrapper();

  return (
    <div
      className={`
        h-full overflow-hidden transition-[width] duration-[500ms] ease-in-out
        fixed md:relative top-0 left-0 z-50
        bg-gray-100 ${showLeft ? 'w-full md:w-[250px]' : 'w-[0px]'}
      `}
    >
      <div className="h-full bg-gray-100 w-full md:w-[250px]">{showLeft && children}</div>
    </div>
  );
};

const Right: FC<WrapperProps> = ({ children }) => {
  const { showRight } = useWrapper();

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

const Main: FC<WrapperProps> = ({ children }) => {
  return (
    <div className="flex-grow h-full transition-all duration-[1500ms] ease-in-out">{children}</div>
  );
};

Wrapper.Main = Main;
Wrapper.Left = Left;
Wrapper.Right = Right;
Wrapper.useWrapper = useWrapper;

export default Wrapper;
