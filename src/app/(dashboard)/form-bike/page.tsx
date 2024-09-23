"use client";
import { useEffect, useState } from "react";

import { MaxWrapper } from "@/components/max-wrapper";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";

interface FormMotorbike {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  motorbikeBrand: string;
  motorbikeModel: string;
  mechanic?: string;
  plate?: string;
  auction?: string;
  yearFabrication?: string;
  yearModification?: string;
  color?: string;
  exchange?: string;
  km?: string;
  fuel?: string;
  cylinders?: string;
  condition: string;
  fairing?: string;
  fip?: string;
  price?: string;
  description?: string;
  document?: string;
  accessories?: string[];
  images?: string[];
}

export default function Page() {
  const [motorbikes, setMotorbikes] = useState<FormMotorbike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMotorbikes = async () => {
      try {
        const motorbikesCollection = collection(db, "motorbikes");
        const motorbikesSnapshot = await getDocs(motorbikesCollection);
        const motorbikesData = motorbikesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FormMotorbike[];
        setMotorbikes(motorbikesData);
      } catch (error) {
        console.error("Erro ao buscar as motocicletas:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorbikes();
  }, []);

  const handleDelete = async (motorbikeId: string) => {
    try {
      await deleteDoc(doc(db, "motorbikes", motorbikeId));
      setMotorbikes(
        motorbikes.filter((motorbike) => motorbike.id !== motorbikeId)
      );
    } catch (error) {
      console.error("Erro ao deletar a motocicleta:", error);
    }
  };

  const handleDownload = async (imageUrl: string) => {
    getDownloadURL(ref(storage, imageUrl)).then((url) => {
      window.open(url, "_blank");
    });
  };

  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen">
        <h1 className="text-3xl font-bold">Formulário de Anúncio</h1>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>Erro: {error}</p>
        ) : (
          motorbikes.map((motorbike) => (
            <Card key={motorbike.id}>
              <CardHeader>
                <CardTitle>{motorbike.motorbikeBrand}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Nome:</strong> {motorbike.name}
                </p>
                <p>
                  <strong>Email:</strong> {motorbike.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {motorbike.phone}
                </p>
                <p>
                  <strong>Localização:</strong> {motorbike.location}
                </p>
                <p>
                  <strong>Marca:</strong> {motorbike.motorbikeBrand}
                </p>
                <p>
                  <strong>Modelo:</strong> {motorbike.motorbikeModel}
                </p>
                {motorbike.mechanic && (
                  <p>
                    <strong>Mecânico:</strong> {motorbike.mechanic}
                  </p>
                )}
                {motorbike.plate && (
                  <p>
                    <strong>Placa:</strong> {motorbike.plate}
                  </p>
                )}
                {motorbike.auction && (
                  <p>
                    <strong>Leilão:</strong> {motorbike.auction}
                  </p>
                )}
                {motorbike.yearFabrication && (
                  <p>
                    <strong>Ano de Fabricação:</strong>{" "}
                    {motorbike.yearFabrication}
                  </p>
                )}
                {motorbike.yearModification && (
                  <p>
                    <strong>Ano de Modificação:</strong>{" "}
                    {motorbike.yearModification}
                  </p>
                )}
                {motorbike.color && (
                  <p>
                    <strong>Cor:</strong> {motorbike.color}
                  </p>
                )}
                {motorbike.exchange && (
                  <p>
                    <strong>Troca:</strong> {motorbike.exchange}
                  </p>
                )}
                {motorbike.km && (
                  <p>
                    <strong>KM:</strong> {motorbike.km}
                  </p>
                )}
                {motorbike.fuel && (
                  <p>
                    <strong>Combustível:</strong> {motorbike.fuel}
                  </p>
                )}
                {motorbike.cylinders && (
                  <p>
                    <strong>Cilindrada:</strong> {motorbike.cylinders}
                  </p>
                )}
                <p>
                  <strong>Condição:</strong> {motorbike.condition}
                </p>
                {motorbike.fairing && (
                  <p>
                    <strong>Carenagem:</strong> {motorbike.fairing}
                  </p>
                )}
                {motorbike.fip && (
                  <p>
                    <strong>FIP:</strong> {motorbike.fip}
                  </p>
                )}
                {motorbike.price && (
                  <p>
                    <strong>Preço:</strong> {motorbike.price}
                  </p>
                )}
                {motorbike.description && (
                  <p>
                    <strong>Descrição:</strong> {motorbike.description}
                  </p>
                )}
                {motorbike.document && (
                  <p>
                    <strong>Documento:</strong> {motorbike.document}
                  </p>
                )}
                {motorbike.accessories && motorbike.accessories.length > 0 && (
                  <p>
                    <strong>Acessórios:</strong>{" "}
                    {motorbike.accessories.join(", ")}
                  </p>
                )}
                {motorbike.images &&
                  motorbike.images.length > 0 &&
                  motorbike.images.map((imageUrl, index) => (
                    <div key={index} className="mt-4">
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        width={500}
                        height={500}
                      />
                      <Button
                        onClick={() => handleDownload(imageUrl)}
                        className="mt-2"
                      >
                        Download Imagem
                      </Button>
                    </div>
                  ))}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(motorbike.id)}
                  className="mt-4"
                >
                  Deletar
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </MaxWrapper>
  );
}
