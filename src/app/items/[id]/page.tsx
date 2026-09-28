import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllItems, getItemById } from "@/lib/directory";

export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <p className="back-link"><Link href="/">Back to directory</Link></p>
      <article className="item-detail">
        <h1>{item.name}</h1>
        <p className="item-category">{item.category}</p>
        <p>{item.description}</p>
        <p className="subtle">{item.location}</p>
      </article>
    </main>
  );
}
