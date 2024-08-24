import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  images: string[];
  name: string;
  phone: string;
  location: string;
  brandCar: string;
  modelCar: string;
  bodyType: string;
  auction: string;
  condition: string;
  mechanic: string;
  plate: string;
  yearFabrication: string;
  yearModification: string;
  color: string;
  exchange: string;
  doors: string;
  km: string;
  motors: string;
  bodywork: string;
  fuel: string;
  document: string;
  price: string;
  accessories: string[];
  description: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  images,
  name,
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
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Here are the details of the car registered by {name}:</p>
    <ul>
      <li>
        <strong>Phone:</strong> {phone}
      </li>
      <li>
        <strong>Location:</strong> {location}
      </li>
      <li>
        <strong>Brand:</strong> {brandCar}
      </li>
      <li>
        <strong>Model:</strong> {modelCar}
      </li>
      <li>
        <strong>Body Type:</strong> {bodyType}
      </li>
      <li>
        <strong>Auction:</strong> {auction}
      </li>
      <li>
        <strong>Condition:</strong> {condition}
      </li>
      <li>
        <strong>Mechanic:</strong> {mechanic}
      </li>
      <li>
        <strong>Plate:</strong> {plate}
      </li>
      <li>
        <strong>Year of Fabrication:</strong> {yearFabrication}
      </li>
      <li>
        <strong>Year of Modification:</strong> {yearModification}
      </li>
      <li>
        <strong>Color:</strong> {color}
      </li>
      <li>
        <strong>Exchange:</strong> {exchange}
      </li>
      <li>
        <strong>Doors:</strong> {doors}
      </li>
      <li>
        <strong>KM:</strong> {km}
      </li>
      <li>
        <strong>Motors:</strong> {motors}
      </li>
      <li>
        <strong>Bodywork:</strong> {bodywork}
      </li>
      <li>
        <strong>Fuel:</strong> {fuel}
      </li>
      <li>
        <strong>Document:</strong> {document}
      </li>
      <li>
        <strong>Price:</strong> {price}
      </li>
      <li>
        <strong>Accessories:</strong> {accessories.join(", ")}
      </li>
      <li>
        <strong>Description:</strong> {description}
      </li>
    </ul>
    <h2>Images:</h2>
    {images.map((image, index) => (
      <img
        key={index}
        src={image as string}
        alt={`Image ${index + 1}`}
        style={{ maxWidth: "100%" }}
      />
    ))}
  </div>
);
