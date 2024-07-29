import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const carSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z
    .string()
    .min(10, { message: "O telefone deve ter pelo menos 10 digitos" }),
  location: z.string(),
  brandCar: z.string(),
  modelCar: z.string(),
  bodyType: z.string(),
  auction: z.string().optional(),
  condition: z.string(),
  mechanic: z.string().optional(),
  plate: z.string().optional(),
  yearFabrication: z.string().optional(),
  yearModification: z.string().optional(),
  color: z.string().optional(),
  exchange: z.string().optional(),
  doors: z.string().optional(),
  km: z.string().optional(),
  motors: z.string().optional(),
  bodywork: z.string().optional(),
  fuel: z.string().optional(),
  document: z.string().optional(),
  price: z.string().optional(),
  accessories: z.array(z.string()).optional(),
  description: z.string().optional(),
  images: z.any().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = carSchema.safeParse(body);
    if (!parsedData.success) {
      // Retorna erro 400 se a validação falhar
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }

    const data = await prisma.car.create({
      data: body,
    });

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    // Retorna erro 500 se ocorrer um erro no servidor
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
