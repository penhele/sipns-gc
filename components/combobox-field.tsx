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
import React from "react";

type Props = {
  label: string;
  items: any;
  className?: string;
};

export default function ComboboxField({ label, items, className }: Props) {
  const field = useFieldContext<string>();

  const selectedItem = React.useMemo(() => {
    return items?.find((item: any) => item.id === field.state.value) || null;
  }, [items, field.state.value]);

  return (
    <Field className={cn(className)}>
      <FieldLabel>{label}</FieldLabel>

      <Combobox
        items={items}
        value={selectedItem}
        onValueChange={(val: any) => {
          if (val === null) {
            field.handleChange("" as any);
            return;
          }
          field.handleChange(val.id);
        }}
        itemToStringLabel={(item: any) => (item ? item.name : "")}
      >
        <ComboboxInput placeholder="Select a name" />

        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: any) => (
              <ComboboxItem key={item.id} value={item}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}
