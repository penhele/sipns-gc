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

type Props = {
  label: string;
  type?: "password" | "number";
  className?: string;
};

export default function TextField({ label, type, className }: Props) {
  const field = useFieldContext<string>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field className={cn(className)}>
      <FieldLabel>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          type={showPassword ? "text" : type}
          value={field.state.value}
          onChange={(e) => {
            field.handleChange(e.target.value);
          }}
          onBlur={field.handleBlur}
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
