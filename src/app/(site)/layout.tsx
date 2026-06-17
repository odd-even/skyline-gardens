import { Footer } from "@/components/Footer";
import { SiteLocationMap } from "@/components/SiteLocationMap";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteLocationMap />
      <Footer />
    </>
  );
}
