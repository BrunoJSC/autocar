import { FieldValue, FormProps } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface FormFielComponentProps {
  form: FormProps<FieldValue | unknown>;
  name: string;
  placeholder: string;
}

export function FormFieldComponent({
  form,
  name,
  placeholder,
}: Readonly<FormFielComponentProps>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-primary-foreground">Nome</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
