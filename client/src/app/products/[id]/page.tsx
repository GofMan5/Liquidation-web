import ProductPage from "@/views/product/ui/Page";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ProductPage id={id} />;
}

export async function generateStaticParams() {
  // For static generation, we'd fetch product IDs here
  // For now, return empty array for dynamic rendering
  return [];
}
