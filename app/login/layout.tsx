import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Log in or create an account to start learning English with Qarint Junior.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
