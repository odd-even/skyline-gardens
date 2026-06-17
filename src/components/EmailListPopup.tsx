import { ElfsightEmbed } from "./elfsight/ElfsightEmbed";
import { ELFSIGHT_WIDGETS } from "./elfsight/constants";

export function EmailListPopup() {
  return <ElfsightEmbed appId={ELFSIGHT_WIDGETS.emailPopup} lazy />;
}
