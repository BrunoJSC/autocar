import { MaxWrapper } from "@/components/max-wrapper";
import { privacyPolicy } from "@/constants/policy";

export default function Page() {
  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen flex flex-col space-y-4 items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Política de Privacidade</h1>
          <p>Versão 1.0 (revisada em 20/01/2024)</p>
        </div>

        <div className="space-y-4 mt-4 text-lg max-w-3xl">
          <ul className="space-y-5">
            {privacyPolicy.map((item) => (
              <li key={item.title}>
                <h2 className="text-xl font-bold">{item.title}</h2>

                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MaxWrapper>
  );
}
