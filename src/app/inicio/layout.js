import { AuthProvider } from "@/context/auth.context";
export default function InicioLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
