"use client";

import { useState } from "react";
import { Search as SearchComponent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Search() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <form className="w-full relative flex md:flex-row p-4 bg-black md:items-center">
      <div className="relative w-full md:w-full">
        <SearchComponent
          size={25}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
        />
        <Input
          placeholder="Pesquisar modelo"
          className="w-full pl-12 rounded-full py-5"
          value={search}
          onChange={handleSearch}
        />

        <Link
          href={{ pathname: "/carros", query: { searchTerm: search } }}
          className="ml-2"
        >
          <Button type="button">Buscar</Button>
        </Link>
      </div>
    </form>
  );
}
