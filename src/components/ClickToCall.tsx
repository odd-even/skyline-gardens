import { ElfsightEmbed } from "./elfsight/ElfsightEmbed";
import { ELFSIGHT_WIDGETS } from "./elfsight/constants";

export function ClickToCall() {
  return <ElfsightEmbed appId={ELFSIGHT_WIDGETS.clickToCall} lazy />;
}
