import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FieldRenderer({ input, value, onChange }) {
  if (input.type === 'textarea') {
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
  
  if (input.type === 'select') {
    const hasGroups = Array.isArray(input.options_grouped) && input.options_grouped.length > 0;
    
    return (
      <Select value={value ?? ''} onValueChange={onChange}>
        <SelectTrigger className="border-slate-200 dark:border-slate-600">
          <SelectValue placeholder={input.placeholder || 'Selecione'} />
        </SelectTrigger>
        <SelectContent>
          {hasGroups ? (
            input.options_grouped.map(group => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          ) : (
            (input.options || []).map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    );
  }
  
  return (
    <Input
      type={input.type || "text"}
      placeholder={input.placeholder}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border-slate-200 dark:border-slate-600"
    />
  );
}