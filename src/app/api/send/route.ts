import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Log raw request body for debugging
    const rawRequestBody = await request.text();
    console.log("Raw request body:", rawRequestBody);

    // Parse the request body
    const requestData = JSON.parse(rawRequestBody);
    const {
      name,
      images,
      phone,
      location,
      brandCar,
      modelCar,
      bodyType,
      auction,
      condition,
      mechanic,
      plate,
      yearFabrication,
      yearModification,
      color,
      exchange,
      doors,
      km,
      motors,
      bodywork,
      fuel,
      document,
      price,
      accessories,
      description,
    } = requestData;

    // Validate required fields
    if (!name || !phone || !location || !brandCar || !modelCar) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["zRr5e@example.com"],
      subject: "Novo Cadastro de Carro",
      react: EmailTemplate({
        firstName: name,
        name,
        images,
        phone,
        location,
        brandCar,
        modelCar,
        bodyType,
        auction,
        condition,
        mechanic,
        plate,
        yearFabrication,
        yearModification,
        color,
        exchange,
        doors,
        km,
        motors,
        bodywork,
        fuel,
        document,
        price,
        accessories,
        description,
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500 }
      );
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
