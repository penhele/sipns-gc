import ComboboxField from "@/components/combobox-field";
import TextField from "@/components/text-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    ComboboxField,
  },
  formComponents: {},
});
