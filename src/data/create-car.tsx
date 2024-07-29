"use server";

import prisma from "@/lib/prisma";

export async function createCar(data: any) {
  const dataCar = await prisma.car.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      brandCar: data.brandCar,
      modelCar: data.modelCar,
      bodyType: data.bodyType,
      auction: data.auction,
      condition: data.condition,
      mechanic: data.mechanic,
      plate: data.plate,
      yearFabrication: data.yearFabrication,
      yearModification: data.yearModification,
      color: data.color,
      exchange: data.exchange,
      doors: data.doors,
      km: data.km,
      motors: data.motors,
      bodywork: data.bodywork,
      document: data.document,
      price: data.price,
      accessories: data.accessories,
      description: data.description,
      images: data.images,
    },
  });

  return dataCar;
}
