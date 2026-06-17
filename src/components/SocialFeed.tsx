import { ElfsightEmbed } from "./elfsight/ElfsightEmbed";
import { ELFSIGHT_WIDGETS } from "./elfsight/constants";

export function SocialFeed() {
  return <ElfsightEmbed appId={ELFSIGHT_WIDGETS.socialFeed} lazy />;
}
