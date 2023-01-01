export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://dry-citadel-15716.herokuapp.com";
