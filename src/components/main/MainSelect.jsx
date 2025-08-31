import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "../ui/select";
import clsx from "clsx";

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
              {option + suffix}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MainSelect;
