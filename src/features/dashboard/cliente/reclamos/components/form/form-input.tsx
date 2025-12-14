"use client"

interface FormInputProps {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export function FormInput({ label, id, value, onChange, placeholder, required }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-input text-foreground placeholder-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
    </div>
  )
}
