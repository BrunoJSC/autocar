"use client";

import { MaxWrapper } from "@/components/max-wrapper";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";

interface FormCar {
  id: string;
  name: string;
  description: string;
  price: number;
  yearFabrication: number;
  yearModification: number;
  km: number;
  color: string;
  location: string;
  exchange: string;
  brandCar: string;
  modelCar: string;
  bodyType: string;
  fuel: string;
  announce: string;
  document: string;
  doors: number;
  mechanic: string;
  plate: string;
  accessories: string[];
  images: string[];
}

export default function Page() {
  const [cars, setCars] = useState<FormCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsCollection = collection(db, "cars");
        const carsSnapshot = await getDocs(carsCollection);
        const carsData = carsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FormCar[];
        setCars(carsData);
      } catch (error) {
        console.error("Erro ao buscar os carros:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (carId: string) => {
    try {
      await deleteDoc(doc(db, "cars", carId));
      setCars(cars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Erro ao deletar o carro:", error);
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
          cars.map((car) => (
            <Card key={car.id}>
              <CardHeader>
                <CardTitle>{car.brandCar}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Modelo: {car.modelCar}</p>
                <p>Ano: {car.yearFabrication}</p>
                <p>Ano de modificação: {car.yearModification}</p>
                <p>Cor: {car.color}</p>
                <p>Combustível: {car.fuel}</p>
                <p>Portas: {car.doors}</p>
                <p>KM: {car.km}</p>
                <p>Preço: {car.price}</p>
                <p>Descrição: {car.description}</p>
                {car.images?.map((imageUrl, index) => (
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
                  onClick={() => handleDelete(car.id)}
                  className="mt-4"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </MaxWrapper>
  );
}