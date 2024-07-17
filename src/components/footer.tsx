import { footerSections } from "@/constants/footer";
import Link from "next/link";
import { MaxWrapper } from "./max-wrapper";

export function Footer() {
  return (
    <MaxWrapper>
      <footer className="bg-black text-primary-foreground p-8  md:flex  md:justify-between md:items-center space-y-4">
        {footerSections.map((section) => (
          <div key={section.title} className="w-1/3 flex flex-col space-y-4">
            <h3 className="text-xl font-bold">{section.title}</h3>
            <div className="flex flex-col space-y-2">
              {section.links.map((link) => (
                <Link href={link.url} key={link.text}>
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </footer>
    </MaxWrapper>
  );
}
