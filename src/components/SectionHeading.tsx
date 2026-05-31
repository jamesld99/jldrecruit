interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} mb-12 lg:mb-16`}>
      {eyebrow && (
        <p className={`mb-4 eyebrow-pill ${align === "center" ? "" : ""}`}>
          {eyebrow}
        </p>
      )}
      <HeadingTag className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-navy-600 sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
