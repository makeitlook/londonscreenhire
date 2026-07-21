import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ServiceBreadcrumbsProps {
  serviceLabel: string;
}

/**
 * Breadcrumbs for service pages.
 * Renders: Home / Services / [Service Name]
 * Uses semantic nav + ol for correct accessibility and future schema support.
 */
export default function ServiceBreadcrumbs({
  serviceLabel,
}: ServiceBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-[0.75rem] text-lsh-grey-500 flex-wrap"
    >
      <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
        <li>
          <Link
            href="/"
            className="hover:text-lsh-grey-300 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={12} strokeWidth={1.5} />
        </li>
        <li>
          <Link
            href="/#services"
            className="text-lsh-grey-400 hover:text-lsh-grey-300 transition-colors duration-200"
          >
            Services
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={12} strokeWidth={1.5} />
        </li>
        <li aria-current="page">
          <span className="text-lsh-grey-300">{serviceLabel}</span>
        </li>
      </ol>
    </nav>
  );
}
