import { SearchProvider } from "@/context/search.context";
import { DniProvider } from "@/context/dni.context";

export default function InicioLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <DniProvider>
        <SearchProvider>{children}</SearchProvider>
      </DniProvider>
    </>
  );
}
