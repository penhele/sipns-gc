import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Field, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { useFieldContext } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { FieldInfo } from "./field-info";

type Props = {
  label: string;
  type?: "password" | "number";
  className?: string;
  readonly?: boolean;
  placeholder?: string;
};

export default function TextField({
  label,
  type,
  className,
  readonly,
  placeholder,
}: Props) {
  const field = useFieldContext<string>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field className={cn(className)}>
      <div className="flex flex-row justify-between">
        <FieldLabel>{label}</FieldLabel>
        <FieldInfo field={field} />
      </div>
      <InputGroup>
        <InputGroupInput
          type={showPassword ? "text" : type}
          value={field.state.value}
          onChange={(e) => {
            const newValue =
              type === "number" ? Number(e.target.value) : e.target.value;
            field.handleChange(newValue as any);
          }}
          onBlur={field.handleBlur}
          readOnly={readonly}
          placeholder={placeholder}
        />

        {type === "password" && (
          <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye /> : <EyeOff />}
          </InputGroupButton>
        )}
      </InputGroup>
    </Field>
  );
}
