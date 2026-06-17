export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

import Studio from "./Studio";

export default function StudioPage() {
  return <Studio />;
}
