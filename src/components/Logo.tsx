import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "header" | "footer";
};

export function Logo({ variant = "header" }: LogoProps) {
  const image = (
    <Image
      src="/images/logo.png"
      alt="JLD Recruit LTD — specialist automotive and engineering recruitment"
      width={405}
      height={233}
      className={
        variant === "header"
          ? "h-12 w-auto sm:h-[3.25rem]"
          : "w-60 h-auto sm:w-72"
      }
      priority={variant === "header"}
    />
  );

  if (variant === "footer") {
    return (
      <Link href="/" className="inline-block transition-opacity hover:opacity-90">
        {image}
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex shrink-0 transition-opacity hover:opacity-90">
      {image}
    </Link>
  );
}
