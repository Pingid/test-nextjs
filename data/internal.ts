import { Product } from "./crystalize";
import { shop, Shop } from "./cms";

export const getProduct = (prod: Product.Product): Item => {
  const varient = prod.variants && prod.variants[0];
  const cms = shop.items.find((x) => x.sku === varient?.sku);
  return { ...varient, ...cms };
};

export type Item = Partial<Product.ProductVariant & Shop["items"][number]>;
