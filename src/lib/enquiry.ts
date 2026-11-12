export function isCvUploadAvailable() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function isEnquiryTestMode() {
  return process.env.NODE_ENV === "development";
}

export function isEmployerDeliveryTest() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.ENQUIRY_DELIVER_TEST === "employer" &&
    Boolean(process.env.RESEND_API_KEY?.trim())
  );
}

export function isLocalFormPreview() {
  return isEnquiryTestMode();
}
