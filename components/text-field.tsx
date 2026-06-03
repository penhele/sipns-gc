import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Field, FieldLabel } from "./ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { useFieldContext } from "@/hooks/use-app-form";

type Props = {
  label: string;
  type?: "password";
};

export default function TextField({ label, type }: Props) {
  const field = useFieldContext<string>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
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
