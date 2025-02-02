import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Joining = lazy(() => import("./connection/Joining"));
const FallbackUI = () => <div>Loading...</div>;
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong: {error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const JoinRoom = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<FallbackUI />}>
        <Joining />
      </Suspense>
    </ErrorBoundary>
  );
};

export default JoinRoom;
