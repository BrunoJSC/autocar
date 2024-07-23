interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  images: any[];
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  images,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
    <h1 style={{ color: "#333" }}>Welcome, {name}!</h1>
    <p>Your email is: {email}</p>
    <p>Your phone is: {phone}</p>
    <p>Your images:</p>
    {images.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Image ${index + 1}`}
        style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
      />
    ))}
  </div>
);
