import { Header } from "@/components/Header";
import { FloatingActions } from "@/components/FloatingActions";
import { ElfsightScript } from "@/components/elfsight/ElfsightScript";
import { EmailListPopup } from "@/components/EmailListPopup";
import { ClickToCall } from "@/components/ClickToCall";
import { Footer } from "@/components/Footer";
import { SiteLocationMap } from "@/components/SiteLocationMap";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
