export function isCvUploadAvailable() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}
