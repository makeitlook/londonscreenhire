"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/shared/error-screen";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-GB">
      <body
        className="font-body"
        style={{ margin: 0, backgroundColor: "#0a0d12", color: "#ffffff" }}
      >
        <ErrorScreen reset={reset} />
      </body>
    </html>
  );
}
