import { NextResponse } from 'next/server'

// Datos de ejemplo (reemplazar con conexión real a BD)
const platillos = [
  {
    id: 1,
    nombre: "Mole Poblano",
    descripcion: "El clásico mole de Puebla con chocolate y chiles",
    imagen: "/mole.jpg",
    ciudadOrigen: "Puebla",
    ingredientes: ["Chocolate", "Chiles", "Ajonjolí", "Pollo"],
    tipo: "Plato fuerte",
    dificultad: "Media",
    tiempoPreparacion: "2 horas",
    rating: 4.8
  },
  // ... más platillos
]

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const platillo = platillos.find(p => p.id === parseInt(id))
    return NextResponse.json(platillo || null)
  }

  return NextResponse.json(platillos)
}