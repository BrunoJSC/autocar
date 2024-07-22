// components/FormFieldComponent.tsx
"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface FormFieldComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
}

const FormFieldComponent = ({
  control,
  name,
  label,
  placeholder,
  description,
}: FormFieldComponentProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormFieldComponent;
