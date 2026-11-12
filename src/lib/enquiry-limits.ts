/** CV file limit. The platform rejects request bodies above 4.5 MB, so the file limit leaves 64 KB for the multipart fields. */
export const MAX_CV_BYTES = 4 * 1024 * 1024;

export const MAX_FORM_OVERHEAD_BYTES = 64 * 1024;

export const MAX_REQUEST_BYTES = MAX_CV_BYTES + MAX_FORM_OVERHEAD_BYTES;

export const CV_LIMIT_LABEL = "4 MB";
