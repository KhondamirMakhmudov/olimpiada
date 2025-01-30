import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const { phone, password } = credentials;

          const formData = new FormData();
          formData.append("phone", phone);
          formData.append("password", password);

          const response = await fetch(
            "https://app.iq-math.uz/v1/student/login/",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: formData,
            }
          );

          const data = await response.json();
          console.log(data); // Debugging response

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          return { token: data.access_token, phone };
        } catch (error) {
          console.error("Login Error:", error.message);
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.phone = token.phone;
      return session;
    },
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "a1d808591edf4ecda7262ad750234b7c5d777f05f76dca55123dd50b1e65568c",
  pages: {
    signIn: "/dashboard",
  },
});
