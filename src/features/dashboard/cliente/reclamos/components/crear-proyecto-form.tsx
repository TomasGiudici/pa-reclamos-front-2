"use client"

import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
import type { CrearProyectoPayload } from "../hooks/use-crear-proyecto"
import { useCrearProyecto } from "../hooks/use-crear-proyecto"
import { useTipoProyecto } from "../hooks/use-tipo-proyecto"
import { FormInput } from "./form/form-input"
import { FormSelect } from "./form/form-select"
import { FormTextarea } from "./form/form-textarea"

const INITIAL_STATE = {
  nombre: "",
  descripcion: "",
  tipoProyectoId: "",
}

export function CrearProyectoForm() {
  const [formData, setFormData] = useState(INITIAL_STATE)

  // Hooks para obtener datos del backend
  const { data: tiposProyecto = [], isLoading: tiposProyectoLoading } =
    useTipoProyecto()

  // Hook para crear proyecto
  const { mutateAsync: crearProyecto, isPending: isSubmitting } =
    useCrearProyecto()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: CrearProyectoPayload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
      tipoProyectoId: formData.tipoProyectoId,
    }

    try {
      await crearProyecto(payload)
      // Reset form on success
      setFormData(INITIAL_STATE)
      toast.success("Proyecto creado exitosamente", {
        description: "Tu proyecto ha sido registrado correctamente."
      })
    } catch (error) {
      toast.error("Error al crear proyecto", {
        description: "No se pudo crear el proyecto. Por favor, intenta nuevamente."
      })
      console.error("Error creating project:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.nombre.trim() && formData.tipoProyectoId

  return (
    <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Crear Nuevo Proyecto
        </h1>
        <p className="text-muted-foreground">
          Complete el formulario para crear un nuevo proyecto
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="nombre"
          label="Nombre del Proyecto"
          value={formData.nombre}
          onChange={(value) => handleInputChange("nombre", value)}
          placeholder="Ingresa el nombre del proyecto"
          required
        />

        <FormTextarea
          label="Descripción"
          id="descripcion"
          value={formData.descripcion}
          onChange={(value) => handleInputChange("descripcion", value)}
          placeholder="Describe brevemente el proyecto (opcional)"
          rows={3}
        />

        <FormSelect
          label="Tipo de Proyecto"
          id="tipoProyectoId"
          value={formData.tipoProyectoId}
          onChange={(value) => handleInputChange("tipoProyectoId", value)}
          options={tiposProyecto.map((tipo) => ({
            value: tipo.id,
            label: tipo.nombre,
          }))}
          required
        />

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting || tiposProyectoLoading}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Creando..."
            : tiposProyectoLoading
              ? "Cargando..."
              : "Crear Proyecto"}
        </button>
      </form>
    </div>
  )
}
