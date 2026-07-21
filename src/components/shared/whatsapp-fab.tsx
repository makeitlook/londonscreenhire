import { MessageCircle } from "lucide-react";
import { contact } from "@/data/contact";

/**
 * WhatsAppFab - fixed floating action button.
 * Only renders when a WhatsApp number is set in contact.ts.
 * Server component - no client JS required.
 */
export default function WhatsAppFab() {
  if (!contact.whatsapp) return null;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-40 w-14 h-14">
      {/* Pulse ring - CSS-only animation for visibility */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"
        aria-hidden="true"
      />
      <a
        href={contact.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={contact.whatsapp.ariaLabel}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#22c35e] active:bg-[#1da851] transition-colors duration-200"
      >
        <MessageCircle size={26} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}
