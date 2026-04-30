// Shopify Storefront API client.
// Customers see Lovable's editorial UI; products + cart + checkout are powered by Shopify.

import { toast } from "@/hooks/use-toast";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "kbkn3u-1s.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "7834c6688c7bcbe1c4495318a6620616";

// Stable mapping: legacy UUID (used by wishlist + asset image map) -> Shopify product handle.
// Order matches the order products were imported in chat.
export const HANDLE_TO_LEGACY_ID: Record<string, string> = {
  "oversize-red": "11111111-1111-1111-1111-111111111111",
  "olive-green-floral": "22222222-2222-2222-2222-222222222222",
  "oversize-off-white": "33333333-3333-3333-3333-333333333333",
  "light-chinese-blue": "44444444-4444-4444-4444-444444444444",
  "formal-collar-kurta": "55555555-5555-5555-5555-555555555555",
  "kendrick-statement-kurta": "66666666-6666-6666-6666-666666666666",
  "oversize-minimal-kurta": "77777777-7777-7777-7777-777777777777",
  "masters-union-kurta": "88888888-8888-8888-8888-888888888888",
};

export const LEGACY_ID_TO_HANDLE: Record<string, string> = Object.fromEntries(
  Object.entries(HANDLE_TO_LEGACY_ID).map(([h, id]) => [id, h])
);

// Style metadata per legacy id (preserves Collection page filter behavior).
export const STYLE_BY_HANDLE: Record<string, string> = {
  "oversize-red": "Chikankari",
  "olive-green-floral": "Block Print",
  "oversize-off-white": "Embroidered",
  "light-chinese-blue": "Chikankari",
  "formal-collar-kurta": "Formal",
  "kendrick-statement-kurta": "Block Print",
  "oversize-minimal-kurta": "Minimal",
  "masters-union-kurta": "Block Print",
};

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<{ data?: T; errors?: any[] } | null> {
  let response: Response;
  try {
    response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (e) {
    console.error("Shopify network error:", e);
    return null;
  }

  if (response.status === 402) {
    toast({
      title: "Shopify: Payment required",
      description:
        "Shopify API access requires an active billing plan. Visit admin.shopify.com to upgrade.",
      variant: "destructive",
    });
    return null;
  }

  if (!response.ok) {
    console.error(`Shopify HTTP ${response.status}`);
    return null;
  }

  const data = await response.json();
  if (data.errors) {
    console.error("Shopify GraphQL errors:", data.errors);
  }
  return data;
}

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}
