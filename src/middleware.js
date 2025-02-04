import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to home if not authenticated
  },
});

export const config = {
  matcher: ["/dashboard", "/olimpiada", "/results"], // Ensure proper array format
};
