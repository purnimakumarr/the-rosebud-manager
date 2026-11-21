// Log details for developers without leaking internals to the console in production.
export function logError(...args) {
  if (import.meta.env.DEV) console.error(...args);
}
