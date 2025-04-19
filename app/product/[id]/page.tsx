import { products } from "@/data/data";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

// Type for route params
type Params = { id: string };

// Allow dynamic routes
export const dynamicParams = true;

// Static generation for each product
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// Metadata generation
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
    const params = await paramsPromise;
  const product = products.find((p) => p.id === params.id);
  return {
    title: product?.name ?? "Product Not Found",
    description: product?.description ?? "",
  };
}


export default async function ProductDetailPage({ 
    params: paramsPromise,
 }: { params: Promise<Params>;
  }) {
  const params = await paramsPromise;
  const product = products.find((p) => p.id === params.id);
  return <ProductDetailClient product={product} allProducts={products} />;
}
