import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface FieldRendererProps {
  input: {
    type: string;
    placeholder?: string;
    options?: string[];
  };
  value: string;
  onChange: (value: string) => void;
}

export default function FieldRenderer({
  input,
  value,
  onChange
}: FieldRendererProps) {
  if (input.type === "textarea") {
    return (
      <Textarea
        placeholder={input.placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="border-slate-200 dark:border-slate-600"
      />
    );
  }

  if (input.type === "select" && input.options) {
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="border-slate-200 dark:border-slate-600">
          <SelectValue placeholder={input.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {input.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Input
      placeholder={input.placeholder}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border-slate-200 dark:border-slate-600"
    />
  );
}
