"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { CRITICALITY_OPTIONS, PRIORITY_OPTIONS } from "../constants/claim-options"
import { useAreas } from "../hooks/use-areas"
import { useCrearReclamo } from "../hooks/use-crear-reclamo"
import { useProyectos } from "../hooks/use-proyectos"
import { useTipoReclamo } from "../hooks/use-tipo-reclamo"
import type { CreateClaimPayload } from "../types/claim"
import { FormRadioGroup } from "./form/form-radio-group"
import { FormSelect } from "./form/form-select"
import { FormTextarea } from "./form/form-textarea"

const INITIAL_STATE = {
  tipoReclamoId: "",
  proyectoId: "",
  areaId: "",
  descripcion: "",
  prioridad: "",
  criticidad: "",
}

export function CrearReclamoForm() {
  const [formData, setFormData] = useState(INITIAL_STATE)

  // Hooks para obtener datos del backend
  const { data: areas = [], isLoading: areasLoading } = useAreas()
  const { data: proyectos = [], isLoading: proyectosLoading } = useProyectos()
  const { data: tiposReclamo = [], isLoading: tiposReclamoLoading } =
    useTipoReclamo()

  // Hook para crear reclamo
  const { mutateAsync: crearReclamo, isPending: isSubmitting } =
    useCrearReclamo()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: CreateClaimPayload = {
      tipoReclamoId: formData.tipoReclamoId,
      proyectoId: formData.proyectoId,
      areaId: formData.areaId,
      descripcion: formData.descripcion,
      prioridad: formData.prioridad,
      criticidad: formData.criticidad,
    }

    try {
      await crearReclamo(payload)
      setFormData(INITIAL_STATE)
      toast.success("Reclamo creado exitosamente", {
        description: "Tu reclamo ha sido registrado y será revisado pronto."
      })
    } catch (error) {
      toast.error("Error al crear reclamo", {
        description: "No se pudo crear el reclamo. Por favor, intenta nuevamente."
      })
      console.error("Error al crear reclamo:", error)
    }
  }

  // Preparar opciones para los selects
  const areasOptions = areas.map((area) => ({
    value: area.id,
    label: area.nombre,
  }))

  const proyectosOptions = proyectos.map((proyecto) => ({
    value: proyecto.id,
    label: proyecto.nombre,
  }))

  const tiposReclamoOptions = tiposReclamo.map((tipo) => ({
    value: tipo.id,
    label: tipo.nombre,
  }))

  return (
    <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Registrar Nuevo Reclamo
        </h1>
        <p className="text-muted-foreground">
          Complete el formulario para registrar su reclamo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSelect
          label="Proyecto"
          id="proyectoId"
          value={formData.proyectoId}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, proyectoId: value }))
          }
          options={proyectosOptions}
          required
        />

        <FormSelect
          label="Tipo de Reclamo"
          id="tipoReclamoId"
          value={formData.tipoReclamoId}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, tipoReclamoId: value }))
          }
          options={tiposReclamoOptions}
          required
        />

        <FormSelect
          label="Área"
          id="areaId"
          value={formData.areaId}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, areaId: value }))
          }
          options={areasOptions}
          required
        />

        <FormTextarea
          label="Descripción Detallada"
          id="descripcion"
          value={formData.descripcion}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, descripcion: value }))
          }
          placeholder="Describa su reclamo con el mayor detalle posible"
          required
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormRadioGroup
            label="Prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, prioridad: value }))
            }
            options={PRIORITY_OPTIONS}
            required
          />

          <FormRadioGroup
            label="Criticidad"
            name="criticidad"
            value={formData.criticidad}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, criticidad: value }))
            }
            options={CRITICALITY_OPTIONS}
            required
          />
        </div>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            areasLoading ||
            proyectosLoading ||
            tiposReclamoLoading
          }
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Enviando..."
            : areasLoading || proyectosLoading || tiposReclamoLoading
              ? "Cargando..."
              : "Enviar Reclamo"}
        </button>
      </form>
    </div>
  )
}
