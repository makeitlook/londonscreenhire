"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/shared/error-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorScreen reset={reset} />;
}
