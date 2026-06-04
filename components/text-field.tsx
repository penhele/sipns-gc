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
  min?: number;
  max?: number;
};

export default function TextField({
  label,
  type,
  className,
  readonly,
  placeholder,
  min,
  max,
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
            if (e.target.value === "") {
              field.handleChange("" as any);
              return;
            }
            let newValue =
              type === "number" ? Number(e.target.value) : e.target.value;
            
            // Enforce and clamp min/max range for number inputs
            if (type === "number" && typeof newValue === "number" && !isNaN(newValue)) {
              if (min !== undefined && newValue < min) newValue = min;
              if (max !== undefined && newValue > max) newValue = max;
            }
            
            field.handleChange(newValue as any);
          }}
          onBlur={field.handleBlur}
          readOnly={readonly}
          placeholder={placeholder}
          min={min}
          max={max}
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
