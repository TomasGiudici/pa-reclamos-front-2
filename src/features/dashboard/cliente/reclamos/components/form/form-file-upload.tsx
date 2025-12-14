"use client"

import type React from "react"

import { useRef } from "react"

interface FormFileUploadProps {
  label: string
  files: File[]
  onChange: (files: File[]) => void
}

export function FormFileUpload({ label, files, onChange }: FormFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files))
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  return (
    <div className="space-y-3">
      <span className="block text-sm font-medium text-foreground">{label}</span>
      <div
        onClick={() => inputRef.current?.click()}
        className="bg-input rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition-all"
      >
        <input ref={inputRef} type="file" multiple onChange={handleFileChange} className="hidden" />
        <div className="flex flex-col items-center gap-2">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-muted-foreground">Click para seleccionar archivos</p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-input rounded-lg px-4 py-2">
              <span className="text-sm text-foreground truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-muted-foreground hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
