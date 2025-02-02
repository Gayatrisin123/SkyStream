import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Hosting = lazy(() => import("./connection/Hosting"));
const FallbackUI = () => <div>Loading...</div>;
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong: {error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const HostRoom = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<FallbackUI />}>
        <Hosting />
      </Suspense>
    </ErrorBoundary>
  );
};

export default HostRoom;
