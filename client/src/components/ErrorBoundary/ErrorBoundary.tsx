import { Button } from "@heroui/react";
import { TbAlertTriangle, TbRefresh, TbHome } from "react-icons/tb";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  let errorMessage = "An unexpected error occurred";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  console.error("Route error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full">
        <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-danger-100 dark:bg-danger-900/40 flex items-center justify-center">
              <TbAlertTriangle
                size={32}
                className="text-danger-600 dark:text-danger-400"
              />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-danger-900 dark:text-danger-100 mb-2">
            Oops! Something went wrong
          </h1>

          <p className="text-danger-700 dark:text-danger-300 mb-6">
            {errorMessage}
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              color="danger"
              variant="flat"
              startContent={<TbRefresh size={18} />}
              onPress={handleReload}
            >
              Reload Page
            </Button>
            <Button
              color="primary"
              startContent={<TbHome size={18} />}
              onPress={handleGoHome}
            >
              Go Home
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && error instanceof Error && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-danger-600 dark:text-danger-400 font-medium">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-3 bg-danger-100 dark:bg-danger-900/60 rounded text-xs overflow-auto max-h-40">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
