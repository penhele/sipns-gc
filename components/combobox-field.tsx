import { useFieldContext } from "@/hooks/use-app-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";
import { Field, FieldLabel } from "./ui/field";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  items: any;
  className?: string;
};

export default function ComboboxField({ label, items, className }: Props) {
  const field = useFieldContext<string>();

  return (
    <Field className={cn(className)}>
      <FieldLabel>{label}</FieldLabel>

      <Combobox
        items={items}
        value={field.state.value}
        onValueChange={(value) => {
          if (value === null) return;
          field.handleChange(value);
        }}
      >
        <ComboboxInput placeholder="Select a name" />

        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item.id}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
