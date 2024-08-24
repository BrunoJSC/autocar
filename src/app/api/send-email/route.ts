import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const brandCar = formData.get("brandCar") as string;
    const modelCar = formData.get("modelCar") as string;
    const bodyType = formData.get("bodyType") as string;
    const auction = formData.get("auction") as string;
    const condition = formData.get("condition") as string;
    const mechanic = formData.get("mechanic") as string;
    const plate = formData.get("plate") as string;
    const yearFabrication = formData.get("yearFabrication") as string;
    const yearModification = formData.get("yearModification") as string;
    const color = formData.get("color") as string;
    const exchange = formData.get("exchange") as string;
    const doors = formData.get("doors") as string;
    const km = formData.get("km") as string;
    const motors = formData.get("motors") as string;
    const bodywork = formData.get("bodywork") as string;
    const fuel = formData.get("fuel") as string;
    const document = formData.get("document") as string;
    const price = formData.get("price") as string;
    const accessories = formData.getAll("accessories") as string[];
    const description = formData.get("description") as string;

    // Extract images
    const images = formData.getAll("images") as File[];

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any other email service
      port: 587,
      secure: false,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or an app password
      },
    });

    // Email content
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: "recipient@example.com", // The recipient email
      subject: "Novo Cadastro de Carro",
      text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        Localidade: ${location}
        Marca: ${brandCar}
        Modelo: ${modelCar}
        Tipo de Carroceria: ${bodyType}
        Leilão: ${auction}
        Condição: ${condition}
        Mecânico: ${mechanic}
        Placa: ${plate}
        Ano de Fabricação: ${yearFabrication}
        Ano de Modificação: ${yearModification}
        Cor: ${color}
        Câmbio: ${exchange}
        Portas: ${doors}
        Quilometragem: ${km}
        Motor: ${motors}
        Lataria: ${bodywork}
        Combustível: ${fuel}
        Documentos: ${document}
        Preço: ${price}
        Acessórios: ${accessories.join(", ")}
        Descrição: ${description}
      `,
      attachments: images.map((image) => ({
        filename: image.name,
        content: image.stream(),
      })) as any[],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
