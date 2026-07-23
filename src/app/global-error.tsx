"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/shared/error-screen";
import siteContent from "@/content/site.json";

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
    <html lang={siteContent.language}>
      <body
        className="font-body"
        style={{ margin: 0, backgroundColor: "#0a0d12", color: "#ffffff" }}
      >
        <ErrorScreen reset={reset} />
      </body>
    </html>
  );
}
