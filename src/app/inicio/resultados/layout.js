import { SearchProvider } from "@/context/search.context";
import { DniProvider } from "@/context/dni.context";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function InicioLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <DniProvider>
        <SearchProvider>
          <NavBar />
          {children}
          <Footer />
        </SearchProvider>
      </DniProvider>
    </>
  );
}
