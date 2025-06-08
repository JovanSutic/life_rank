import LoadingOverlay from './Basic/LoadingOverlay';
import ErrorOverlay from './Basic/ErrorOverlay';
import DotLoader from './Basic/DotLoader';

type AsyncStateWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  children: React.ReactNode;
  transparent?: boolean;
};

function AsyncStateWrapper({
  isLoading,
  isError,
  error,
  children,
  transparent = false,
}: AsyncStateWrapperProps) {
  return (
    <>
      {isError && (
        <ErrorOverlay message={error instanceof Error ? error.message : 'Something went wrong.'} />
      )}
      {isLoading && !isError && (transparent ? <DotLoader /> : <LoadingOverlay />)}
      {children}
    </>
  );
}

export default AsyncStateWrapper;
