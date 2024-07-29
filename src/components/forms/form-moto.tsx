"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormFieldComponent from "@/components/forms/form-field-component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/constants/location";
import { brandCars } from "@/constants/brand-cars";
import { bodyTypes } from "@/constants/body-type";
import { conditions } from "@/constants/conditions";
import { mechanics } from "@/constants/mechanic";
import { colors } from "@/constants/colors";
import { exchange } from "@/constants/exchange";
import { bodyworks } from "@/constants/bodywork";
import { Checkbox } from "@/components/ui/checkbox";
import { accessoriesMotorbikesType } from "@/constants/accessories";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { fuel } from "@/constants/fuel";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { brandBikes } from "@/constants/brand-bikes";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Digite um email válido" }),
  phone: z
    .string()
    .min(10, { message: "O telefone deve ter pelo menos 10 dígitos" }),
  location: z.string(),
  motorbikeBrand: z.string(),
  motorbikeModel: z.string(),
  mechanic: z.string().optional(),
  plate: z.string().optional(),
  auction: z.string().optional(),
  yearFabrication: z.string().optional(),
  yearModification: z.string().optional(),
  color: z.string().optional(),
  exchange: z.string().optional(),
  km: z.string().optional(),
  fuel: z.string().optional(),
  cylinders: z.string().optional(),
  condition: z.string(),
  fairing: z.string().optional(),
  fip: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  document: z.string().optional(),
  accessories: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)),
});

export function FormMotorbike() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      motorbikeBrand: "",
      motorbikeModel: "",
      mechanic: "",
      plate: "",
      auction: "",
      yearFabrication: "",
      yearModification: "",
      color: "",
      exchange: "",
      km: "",
      fuel: "",
      cylinders: "",
      condition: "",
      fairing: "",
      fip: undefined,
      price: undefined,
      description: "",
      document: "",
      accessories: [],
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const imageUrls = await Promise.all(
        values.images.map(async (image: File) => {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      const motorbikeData = {
        ...values,
        images: imageUrls,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "motorbikes"), motorbikeData);

      toast({
        title: "Sucesso!",
        description: `Motocicleta cadastrada com ID: ${docRef.id}`,
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao cadastrar motocicleta:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar a motocicleta.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldComponent
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Digite o nome"
        />

        <FormFieldComponent
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite o email"
        />

        <FormFieldComponent
          control={form.control}
          name="phone"
          label="Celular"
          placeholder="Digite o número do celular"
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localidade</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.value}>
                        {location.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motorbikeBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandBikes.map((brand) => (
                      <SelectItem key={brand.id} value={brand.value}>
                        {brand.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormFieldComponent
          control={form.control}
          name="motorbikeModel"
          label="Modelo"
          placeholder="Digite o modelo"
        />

        <FormField
          control={form.control}
          name="fuel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de combustível</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuel.map((fuel) => (
                      <SelectItem key={fuel.id} value={fuel.value}>
                        {fuel.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="auction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leilão</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condição da motocicleta</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.id} value={condition.value}>
                        {condition.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mechanic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mecânico</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {mechanics.map((mechanic) => (
                      <SelectItem key={mechanic.id} value={mechanic.value}>
                        {mechanic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormFieldComponent
          control={form.control}
          name="plate"
          label="Placa"
          placeholder="Digite a placa"
        />

        <FormFieldComponent
          control={form.control}
          name="yearFabrication"
          label="Ano de fabricação"
          placeholder="Digite o ano de fabricação"
        />

        <FormFieldComponent
          control={form.control}
          name="yearModification"
          label="Ano de modificação"
          placeholder="Digite o ano de modificação"
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor da motocicleta</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color.id} value={color.value}>
                        {color.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exchange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de câmbio</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {exchange.map((exchange) => (
                      <SelectItem key={exchange.id} value={exchange.value}>
                        {exchange.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormFieldComponent
          control={form.control}
          name="km"
          label="Quilometragem"
          placeholder="Digite a quilometragem"
        />

        <FormFieldComponent
          control={form.control}
          name="cylinders"
          label="Cilindrada"
          placeholder="Digite a cilindrada"
        />

        <FormFieldComponent
          control={form.control}
          name="fairing"
          label="Carenagem"
          placeholder="Digite a carenagem"
        />

        <FormFieldComponent
          control={form.control}
          name="fip"
          label="FIP"
          placeholder="Digite o valor do FIP"
        />

        <FormFieldComponent
          control={form.control}
          name="price"
          label="Preço"
          placeholder="Digite o preço"
        />

        <FormFieldComponent
          control={form.control}
          name="document"
          label="Documentos"
          placeholder="Digite informações sobre documentos"
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva uma descrição"
                  rows={4}
                  className="resize-none"
                  cols={40}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accessories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acessórios</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {accessoriesMotorbikesType.map((accessory) => (
                    <div
                      key={accessory.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        value={accessory.value}
                        checked={field?.value?.includes(accessory.value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field?.value as string[]), accessory.value]
                            : field?.value?.filter(
                                (value) => value !== accessory?.value
                              );
                          field.onChange(newValue);
                        }}
                      />
                      <FormLabel className="font-normal">
                        {accessory.title}
                      </FormLabel>
                    </div>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    field.onChange(Array.from(e.target.files || []));
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
