"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { GoogleReview } from "@/lib/google-reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = rating >= index + 1;

        return (
          <svg
            key={index}
            className={`h-4 w-4 ${filled ? "text-amber-400" : "text-brand-100"}`}
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

function ReviewCard({ review }: { review: GoogleReview }) {
  const name = review.authorUri ? (
    <a
      href={review.authorUri}
      target="_blank"
      rel="noopener noreferrer"
      className="block font-semibold text-navy-900 underline-offset-2 hover:text-brand-700 hover:underline"
    >
      {review.authorName}
    </a>
  ) : (
    <p className="font-semibold text-navy-900">{review.authorName}</p>
  );

  return (
    <article
      data-review-card
      className="flex h-auto min-h-full snap-start flex-col rounded-2xl border border-brand-100 bg-white p-6 card-shadow flex-[0_0_100%] sm:flex-[0_0_calc((100%-1.5rem)/2)] lg:flex-[0_0_calc((100%-3rem)/3)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {review.authorPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.authorPhotoUrl}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
              {review.authorName.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            {name}
            {review.relativeTime ? (
              <p className="text-xs text-navy-500">{review.relativeTime}</p>
            ) : null}
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-navy-600">{review.text}</p>
    </article>
  );
}

function ArrowButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-navy-900 shadow-sm transition hover:border-brand-400 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        {direction === "previous" ? (
          <path
            fillRule="evenodd"
            d="M11.78 4.22a.75.75 0 0 1 0 1.06L7.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M8.22 4.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L12.94 10 8.22 5.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
  );
}

export function GoogleReviewCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const carouselId = useId();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEnds = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    setAtStart(scroller.scrollLeft <= 4);
    setAtEnd(scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    updateEnds();
    scroller.addEventListener("scroll", updateEnds, { passive: true });
    const observer = new ResizeObserver(updateEnds);
    observer.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", updateEnds);
      observer.disconnect();
    };
  }, [updateEnds, reviews.length]);

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>("[data-review-card]");
    if (!scroller || !card) return;

    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap || "0") || 0;
    const distance = card.getBoundingClientRect().width + gap;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scroller.scrollBy({
      left: direction * distance,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const ordered = [...reviews].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-end gap-3">
        <ArrowButton
          direction="previous"
          label="Show previous reviews"
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
        />
        <ArrowButton
          direction="next"
          label="Show next reviews"
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
        />
      </div>
      <div
        id={carouselId}
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Google reviews"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ordered.map((review) => (
          <ReviewCard key={`${review.authorName}-${review.publishedAt}-${review.rating}`} review={review} />
        ))}
      </div>
    </div>
  );
}
