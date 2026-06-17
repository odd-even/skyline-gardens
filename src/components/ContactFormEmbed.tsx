import { ElfsightEmbed } from "./elfsight/ElfsightEmbed";
import { ELFSIGHT_WIDGETS } from "./elfsight/constants";

export function ContactFormEmbed() {
  return (
    <div className="min-h-0 flex-1">
      <ElfsightEmbed appId={ELFSIGHT_WIDGETS.contactForm} lazy />
    </div>
  );
}
