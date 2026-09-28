import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Item not found.</h1>
      <p><Link href="/">Back to directory</Link></p>
    </main>
  );
}
