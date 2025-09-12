import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "../ui/select";
import clsx from "clsx";

function formatLabel(str) {
  const map = {
    currMonth: "Current Month",
    prevMonth: "Previous Month",
    "7days": "7 Days",
    "3days": "3 Days",
    "14days": "14 Days",
    "30days": "30 Days",
  };

  // kalau ada di map, langsung return
  if (map[str]) return map[str];

  // fallback: camelCase → spasi
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}

const MainSelect = ({
  value,
  label,
  onChange,
  placeholder,
  options,
  trigerProps,
  contentProps,
  containerProps,
  suffix = "",
  ...props
}) => {
  return (
    <div
      className={clsx("w-full flex flex-col gap-1", containerProps?.className)}
    >
      {label && <label className="font-medium text-[14px]">{label}</label>}
      <Select value={value} onValueChange={onChange} {...props}>
        <SelectTrigger className="w-full capitalize" {...trigerProps}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent {...contentProps}>
          {options.map((option, i) => (
            <SelectItem key={i} value={option} className="capitalize">
              {formatLabel(String(option)) + suffix}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MainSelect;
