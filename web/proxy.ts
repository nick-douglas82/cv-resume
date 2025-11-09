import withAuth from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/resumes/:path*"],
};

export default withAuth({
  pages: { signIn: "/login" },
});
