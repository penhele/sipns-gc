import { LucideIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";

type Props = {
  Icon: LucideIcon;
  label: string;
} & IconVariant;

export default function LabelSection({ Icon, label, color }: Props) {
  return (
    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
      <Icon className={icon({ color })} /> {label}
    </h2>
  );
}

const icon = tv({
  base: "w-5 h-5",
  variants: {
    color: {
      blue: "text-sky-500",
      purple: "text-purple-500",
    },
  },
});

type IconVariant = VariantProps<typeof icon>;
