import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Joining = lazy(() => import("./connection/Joining"));
const FallbackUI = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex items-center space-x-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md">
    <p className="text-lg text-red-600 font-semibold mb-4">
      Something went wrong: {error.message}
    </p>
    <button
      type="button"
      onClick={() => {
        resetErrorBoundary();
        window.location.href = "/";
      }}
      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
    >
      Try Again
    </button>
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
