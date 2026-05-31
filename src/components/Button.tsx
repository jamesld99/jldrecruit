import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-md shadow-brand-500/30 hover:shadow-lg hover:shadow-brand-500/40",
  secondary:
    "bg-white text-brand-700 border-2 border-brand-200 hover:bg-brand-50 hover:border-brand-300 shadow-sm",
  outline:
    "border-2 border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white hover:border-brand-600",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
