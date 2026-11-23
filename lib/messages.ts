import { DotquadError } from "@dotquad/net";

/** What to tell the user when a request fails, in the website's voice. */
export function errorMessage(err: unknown): string {
  if (!(err instanceof DotquadError)) return "Something went wrong. Try again.";
  if (err.isQuotaExceeded) {
    const when = err.resetsAt
      ? new Date(err.resetsAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })
      : "the 1st";
    return `Your key's requests for this month are used up. They reset on ${when}.`;
  }
  if (err.status === 429) return "Too many lookups from this address. Try again in a minute.";
  if (err.isInvalidKey) return "Your API key isn't working. Check it in Settings, or remove it.";
  if (err.isPlanRequired)
    return err.plan ? `That needs the ${err.plan} plan.` : "That needs a paid plan.";
  if (err.code === "network_error")
    return "Couldn't reach Dotquad. Check your connection and try again.";
  return err.message;
}
