import { buildLlmsTxt } from "@/lib/llms";
import { getProducts } from "@/lib/products";
import { getSiteSettings } from "@/sanity/fetch";

export const revalidate = 3600;

export async function GET() {
  const [settings, products] = await Promise.all([getSiteSettings(), getProducts()]);

  return new Response(buildLlmsTxt(settings, products.rows.length), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
