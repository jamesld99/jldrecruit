import type { GoogleReview, GoogleReviewsData, GoogleReviewsLink } from "@/lib/google-reviews";
import { SectionHeading } from "./SectionHeading";

function StarRating({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const starClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const filled = rating >= index + 1;
        const partial = !filled && rating > index;

        return (
          <svg
            key={index}
            className={`${starClass} ${filled || partial ? "text-amber-400" : "text-brand-100"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 card-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {review.authorPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.authorPhotoUrl}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {review.authorName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold text-navy-900">{review.authorName}</p>
            {review.relativeTime ? (
              <p className="text-xs text-navy-500">{review.relativeTime}</p>
            ) : null}
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="mt-4 flex-grow text-sm leading-relaxed text-navy-600">
        {review.text}
      </p>
    </article>
  );
}

type GoogleReviewsProps = {
  data: GoogleReviewsData;
};

export function GoogleReviewsLinkCard({ mapsUrl, writeReviewUrl }: GoogleReviewsLink) {
  return (
    <section className="gradient-section py-20 lg:py-28" aria-labelledby="google-reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            eyebrow="Client Feedback"
            title="Find us on Google"
            description="Had a good experience with JLD Recruit? We'd really appreciate a Google review — it helps other employers and candidates find us."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600"
            >
              <GoogleIcon />
              View on Google
            </a>
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
            >
              Leave a review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoogleReviews({ data }: GoogleReviewsProps) {
  return (
    <section className="gradient-section py-20 lg:py-28" aria-labelledby="google-reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Client Feedback"
            title="Google Reviews"
            description="Real feedback from employers and candidates who have worked with JLD Recruit Ltd."
            align="left"
          />
          <div className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-brand-100 bg-white px-6 py-5 card-shadow sm:items-end">
            <div className="flex items-center gap-3">
              <GoogleIcon />
              <div>
                <p className="text-3xl font-bold text-navy-900">
                  {data.rating.toFixed(1)}
                </p>
                <p className="text-sm text-navy-500">
                  {data.totalReviews} Google review{data.totalReviews === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <StarRating rating={data.rating} />
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.reviews.map((review) => (
            <ReviewCard key={`${review.authorName}-${review.publishedAt}`} review={review} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:from-brand-700 hover:to-brand-600"
          >
            View all reviews on Google
          </a>
          <a
            href={data.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
          >
            Leave a review
          </a>
        </div>
      </div>
    </section>
  );
}
