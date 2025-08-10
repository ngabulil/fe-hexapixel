import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({ label, placeholder, labelProps, inputProps }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={label} {...labelProps}>
        {label}
      </Label>
      <Input
        id={label}
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
}
