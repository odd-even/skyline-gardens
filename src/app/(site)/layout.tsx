import { Header } from "@/components/Header";
import { FloatingActions } from "@/components/FloatingActions";
import { ElfsightScript } from "@/components/elfsight/ElfsightScript";
import { EmailListPopup } from "@/components/EmailListPopup";
import { ClickToCall } from "@/components/ClickToCall";
import { Footer } from "@/components/Footer";
import { SiteLocationMap } from "@/components/SiteLocationMap";
import { StructuredData } from "@/components/StructuredData";
import { getSiteSettings } from "@/sanity/fetch";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <StructuredData settings={settings} />
      <ElfsightScript />
      <EmailListPopup />
      <ClickToCall />
      <Header />
      <FloatingActions />
      <main>{children}</main>
      <SiteLocationMap />
      <Footer />
    </>
  );
}
