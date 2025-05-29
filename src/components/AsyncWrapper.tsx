import LoadingOverlay from './LoadingOverlay';
import ErrorOverlay from './ErrorOverlay';

type AsyncStateWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  children: React.ReactNode;
};

function AsyncStateWrapper({ isLoading, isError, error, children }: AsyncStateWrapperProps) {
  return (
    <>
      {isError && (
        <ErrorOverlay message={error instanceof Error ? error.message : 'Something went wrong.'} />
      )}
      {isLoading && !isError && <LoadingOverlay />}
      {children}
    </>
  );
}

export default AsyncStateWrapper;
