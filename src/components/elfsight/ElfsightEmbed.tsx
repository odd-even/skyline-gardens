import { elfsightAppClass } from "./constants";

type ElfsightEmbedProps = {
  appId: string;
  lazy?: boolean;
};

export function ElfsightEmbed({ appId, lazy = false }: ElfsightEmbedProps) {
  return (
    <div
      className={elfsightAppClass(appId)}
      {...(lazy ? { "data-elfsight-app-lazy": true } : {})}
    />
  );
}
