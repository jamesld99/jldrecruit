import Image from "next/image";

type TemporarySpecialistProps = {
  variant?: "default" | "compact";
};

export function TemporarySpecialist({ variant = "default" }: TemporarySpecialistProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-2xl border border-brand-200 bg-white card-shadow ${
        isCompact ? "p-6 sm:flex-row sm:items-center" : "p-8 sm:flex-row sm:items-center lg:p-10"
      }`}
    >
      <div className="shrink-0">
        <Image
          src="/images/eleanor.png"
          alt="Eleanor — Temporary recruitment specialist at JLD Recruit Ltd"
          width={1024}
          height={1024}
          className={`rounded-2xl object-cover object-top shadow-md ring-4 ring-brand-100 ${
            isCompact ? "h-32 w-32 sm:h-36 sm:w-36" : "h-40 w-40 sm:h-44 sm:w-44"
          }`}
        />
      </div>
      <div className={`text-center ${isCompact ? "sm:text-left" : "sm:text-left"}`}>
        {!isCompact && (
          <p className="mb-3 eyebrow-pill">Meet Your Specialist</p>
        )}
        <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Eleanor</h2>
        <p className="mt-3 text-lg leading-relaxed text-navy-600">
          Eleanor is our Temporary recruitment specialist.
        </p>
        <p className="mt-2 text-sm text-navy-500">
          Contact Eleanor to discuss temporary and contract staffing for your business.
        </p>
      </div>
    </div>
  );
}
