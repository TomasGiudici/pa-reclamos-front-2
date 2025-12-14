"use client"

interface RadioOption {
  value: string
  label: string
}

interface FormRadioGroupProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  options: readonly RadioOption[]
  required?: boolean
}

export function FormRadioGroup({ label, name, value, onChange, options, required }: FormRadioGroupProps) {
  return (
    <div className="space-y-3">
      <span className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
              value === option.value ? "bg-primary text-primary-foreground" : "bg-input text-foreground hover:bg-muted"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              required={required}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
