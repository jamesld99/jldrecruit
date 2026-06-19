import { unstable_cache } from "next/cache";
import { siteConfig } from "@/lib/constants";

export type GoogleReview = {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishedAt: string;
};

export type GoogleReviewsData = {
  placeName: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  mapsUrl: string;
  writeReviewUrl: string;
  syncedAt: string;
};

export type GoogleReviewsLink = {
  mapsUrl: string;
  writeReviewUrl: string;
};

export type GoogleReviewsDisplay =
  | { mode: "reviews"; data: GoogleReviewsData }
  | { mode: "link"; link: GoogleReviewsLink };

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
};

type PlacesDetailsResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

function getPlaceId() {
  return process.env.GOOGLE_PLACE_ID?.trim() || siteConfig.googlePlaceId;
}

function getApiKey() {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || "";
}

function getGoogleMapsUrl() {
  return (
    process.env.GOOGLE_REVIEWS_URL?.trim() ||
    siteConfig.googleReviewsUrl.trim() ||
    ""
  );
}

function getGoogleWriteReviewUrl() {
  return (
    process.env.GOOGLE_WRITE_REVIEW_URL?.trim() ||
    siteConfig.googleWriteReviewUrl.trim() ||
    `${getGoogleMapsUrl().replace(/\/$/, "")}/review`
  );
}

function buildMapsUrl(placeId: string) {
  const reviewsUrl = getGoogleMapsUrl();

  return (
    reviewsUrl ||
    `https://www.google.com/maps/search/?api=1&query=JLD%20Recruit%20Ltd&query_place_id=${placeId}`
  );
}

function buildWriteReviewUrl(placeId: string) {
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}

function parseReview(review: PlacesReview): GoogleReview | null {
  const authorName = review.authorAttribution?.displayName?.trim();
  const rating = review.rating;

  if (!authorName || !rating) {
    return null;
  }

  const text = review.text?.text?.trim();

  return {
    authorName,
    authorPhotoUrl: review.authorAttribution?.photoUri,
    rating,
    text: text || "Rated this business on Google.",
    relativeTime: review.relativePublishTimeDescription ?? "",
    publishedAt: review.publishTime?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  };
}

async function fetchGoogleReviewsFromApi(): Promise<GoogleReviewsData | null> {
  const placeId = getPlaceId();
  const apiKey = getApiKey();

  if (!placeId || !apiKey) {
    return null;
  }

  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,reviews",
    },
    next: { revalidate: 3600, tags: ["google-reviews"] },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Google Places API returned ${response.status} for place ${placeId}: ${errorBody}`
    );
  }

  const data = (await response.json()) as PlacesDetailsResponse;
  const reviews = (data.reviews ?? [])
    .map(parseReview)
    .filter((review): review is GoogleReview => review !== null);

  if (!data.rating || !data.userRatingCount || reviews.length === 0) {
    console.warn("Google Places returned no usable reviews:", {
      placeId,
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      rawReviewCount: data.reviews?.length ?? 0,
      parsedReviewCount: reviews.length,
    });
    return null;
  }

  return {
    placeName: data.displayName?.text ?? "JLD Recruit Ltd",
    rating: data.rating,
    totalReviews: data.userRatingCount,
    reviews,
    mapsUrl: data.googleMapsUri ?? buildMapsUrl(placeId),
    writeReviewUrl: buildWriteReviewUrl(placeId),
    syncedAt: new Date().toISOString(),
  };
}

const getCachedGoogleReviews = unstable_cache(
  async () => fetchGoogleReviewsFromApi(),
  ["google-place-reviews-v2"],
  {
    revalidate: 3600,
    tags: ["google-reviews"],
  }
);

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  if (!getApiKey()) {
    return null;
  }

  try {
    return await getCachedGoogleReviews();
  } catch (error) {
    console.error("Google reviews sync failed:", error);
    return null;
  }
}

export async function getGoogleReviewsDisplay(): Promise<GoogleReviewsDisplay | null> {
  const reviews = await getGoogleReviews();

  if (reviews && reviews.reviews.length > 0) {
    return { mode: "reviews", data: reviews };
  }

  const mapsUrl = getGoogleMapsUrl();

  if (mapsUrl) {
    return {
      mode: "link",
      link: {
        mapsUrl,
        writeReviewUrl: getGoogleWriteReviewUrl(),
      },
    };
  }

  return null;
}

export const googleReviewsRevalidateSeconds = 3600;
