interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout wrapper retained for consistent section composition. Keeping this a
 * server component avoids shipping an animation runtime for decorative motion.
 */
export function FadeIn({ children, className }: FadeInProps) {
  return <div className={className}>{children}</div>;
}
