import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2>Página não encontrada</h2>
      <p>Por favor, tente novamente.</p>
      <Link href="/">Retornar para o site</Link>
    </div>
  );
}
