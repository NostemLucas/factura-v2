interface ISidebarVentas {
  id: String
  title: String
  items: ISidebarItems[]
}

interface ISidebarItems {
  id: String
  icon: String
  title: String
  color: String
  chip?: Number | undefined
}

interface InvoiceItem {
  description: string
  details: string
  quantity: number
  price: number
}

interface Client {
  name: string
  address: string
  email: string
  insuranceInfo: string
}

export interface Invoice {
  id: number
  type: 'invoice' | 'sale'
  company: string
  number: string
  date: string
  description: string
  amount: number
  isPaid: boolean
  address: string
  email: string
  taxId: string
  reference: string
  paymentMethod: string
  insuranceCoverage: number
  prescriptionInfo: string | null
  client: Client
  items: InvoiceItem[]
}

export const MockSidebar: ISidebarVentas[] = [
  {
    id: '1',
    title: 'Principal',
    items: [
      {
        id: '1-1',
        icon: 'i-lucide-inbox',
        title: 'Recibidas',
        color: 'text-blue-700',
        chip: 12
      },
      {
        id: '1-2',
        icon: 'i-lucide-star',
        title: 'Destacadas',
        color: 'text-yellow-500'
      },
      {
        id: '1-3',
        icon: 'i-lucide-clock',
        title: 'Recientes',
        color: 'text-orange-500'
      },
      {
        id: '1-4',
        icon: 'i-lucide-archive',
        title: 'Archivadas',
        color: 'text-gray-700'
      }
    ]
  },
  {
    id: '2',
    title: 'Categorías',
    items: [
      {
        id: '2-1',
        icon: 'i-lucide-pill',
        title: 'Medicamentos',
        color: 'text-blue-600'
      },
      {
        id: '2-2',
        icon: 'i-lucide-stethoscope',
        title: 'Consultas',
        color: 'text-green-600'
      },
      {
        id: '2-3',
        icon: 'i-lucide-activity',
        title: 'Tratamientos',
        color: 'text-yellow-600'
      },
      {
        id: '2-4',
        icon: 'i-lucide-microscope',
        title: 'Análisis',
        color: 'text-purple-600'
      },
      {
        id: '2-5',
        icon: 'i-lucide-bed',
        title: 'Hospitalización',
        color: 'text-red-600'
      }
    ]
  }
]

export const MockInvoices: Invoice[] = [
  {
    id: 1,
    type: 'invoice', // Add type field
    company: 'Farmacia MediSalud',
    number: 'F-2023-001',
    date: '12/03/2023',
    description: 'Medicamentos recetados para tratamiento crónico',
    amount: 87.5,
    isPaid: true,
    address: 'Av. de la Salud 123, Madrid',
    email: 'facturacion@medisalud.com',
    taxId: 'B-12345678',
    reference: 'RX-2023-4567',
    paymentMethod: 'Tarjeta sanitaria',
    insuranceCoverage: 65.63,
    prescriptionInfo:
      'Receta médica #RX-2023-4567 emitida por Dr. García, Colegiado nº 28001234',
    client: {
      name: 'María Rodríguez López',
      address: 'C/ Principal 45, 2ºB, Madrid',
      email: 'maria.rodriguez@email.com',
      insuranceInfo: 'Aseguradora: MediSalud Plus - Póliza: MS-987654'
    },
    items: [
      {
        description: 'Atorvastatina 20mg',
        details:
          'Medicamento para reducir el colesterol. Posología: 1 comprimido diario',
        quantity: 1,
        price: 24.95
      },
      {
        description: 'Metformina 850mg',
        details:
          'Control de glucemia. Posología: 1 comprimido con las comidas principales',
        quantity: 2,
        price: 18.75
      },
      {
        description: 'Losartán 50mg',
        details:
          'Tratamiento hipertensión. Posología: 1 comprimido cada 24 horas',
        quantity: 1,
        price: 15.3
      },
      {
        description: 'Servicio de seguimiento Pfarmacoterapéutico',
        details: 'Revisión de interacciones y adherencia al tratamiento',
        quantity: 1,
        price: 9.75
      }
    ]
  },
  {
    id: 2,
    type: 'sale', // Example of a sales note
    company: 'Centro Médico Especialidades',
    number: 'F-2023-002',
    date: '15/03/2023',
    description: 'Consulta especialista y pruebas diagnósticas',
    amount: 175.2,
    isPaid: false,
    address: 'Plaza de la Medicina 45, Madrid',
    email: 'admin@centromedico.com',
    taxId: 'A-87654321',
    reference: 'CM-2023-7890',
    paymentMethod: 'Transferencia bancaria',
    insuranceCoverage: 140.16,
    prescriptionInfo: null,
    client: {
      name: 'Carlos Sánchez Martín',
      address: 'Av. del Parque 78, 3ºA, Madrid',
      email: 'carlos.sanchez@email.com',
      insuranceInfo: 'Aseguradora: SaludTotal - Póliza: ST-123456'
    },
    items: [
      {
        description: 'Consulta Cardiología',
        details: 'Dr. Martínez - Primera visita con evaluación completa',
        quantity: 1,
        price: 95.0
      },
      {
        description: 'Electrocardiograma',
        details: 'Prueba diagnóstica básica',
        quantity: 1,
        price: 45.0
      },
      {
        description: 'Análisis sanguíneo perfil lipídico',
        details: 'Incluye colesterol total, HDL, LDL y triglicéridos',
        quantity: 1,
        price: 35.2
      }
    ]
  },
  {
    id: 3,
    type: 'invoice',
    company: 'Clínica Dental Sonrisa',
    number: 'F-2023-003',
    date: '18/03/2023',
    description: 'Tratamiento odontológico y limpieza dental',
    amount: 230.0,
    isPaid: true,
    address: 'C/ Odontología 56, Madrid',
    email: 'citas@clinicasonrisa.com',
    taxId: 'B-56789012',
    reference: 'CD-2023-3456',
    paymentMethod: 'Tarjeta de crédito',
    insuranceCoverage: 115.0,
    prescriptionInfo: null,
    client: {
      name: 'Ana Gómez Torres',
      address: 'C/ del Roble 23, 1ºC, Madrid',
      email: 'ana.gomez@email.com',
      insuranceInfo: 'Aseguradora: DentalPlus - Póliza: DP-567890'
    },
    items: [
      {
        description: 'Limpieza dental profesional',
        details: 'Eliminación de placa y sarro con ultrasonidos',
        quantity: 1,
        price: 65.0
      },
      {
        description: 'Empaste composite',
        details: 'Pieza 26, cara oclusal, material composite fotopolimerizable',
        quantity: 2,
        price: 55.0
      },
      {
        description: 'Radiografía periapical',
        details: 'Diagnóstico complementario',
        quantity: 1,
        price: 25.0
      },
      {
        description: 'Aplicación de flúor',
        details: 'Tratamiento preventivo',
        quantity: 1,
        price: 30.0
      }
    ]
  },
  {
    id: 4,
    type: 'invoice',
    company: 'Fisioterapia y Rehabilitación Activa',
    number: 'F-2023-004',
    date: '20/03/2023',
    description: 'Sesiones de fisioterapia para lesión deportiva',
    amount: 195.0,
    isPaid: true,
    address: 'Av. del Deporte 89, Madrid',
    email: 'info@fisioactiva.com',
    taxId: 'B-90123456',
    reference: 'FR-2023-5678',
    paymentMethod: 'Efectivo',
    insuranceCoverage: 0,
    prescriptionInfo:
      'Tratamiento recomendado por Dr. Ortega, Traumatólogo, Colegiado nº 28005678',
    client: {
      name: 'Javier Martín Ruiz',
      address: 'C/ Atleta 12, 4ºD, Madrid',
      email: 'javier.martin@email.com',
      insuranceInfo: 'Sin cobertura de seguro para este tratamiento'
    },
    items: [
      {
        description: 'Valoración inicial fisioterapéutica',
        details: 'Evaluación completa de la lesión y plan de tratamiento',
        quantity: 1,
        price: 45.0
      },
      {
        description: 'Sesión de fisioterapia manual',
        details: 'Tratamiento de esguince de tobillo grado II',
        quantity: 5,
        price: 30.0
      }
    ]
  },
  {
    id: 5,
    type: 'invoice',
    company: 'Laboratorio Análisis Clínicos',
    number: 'F-2023-005',
    date: '22/03/2023',
    description: 'Análisis clínicos completos',
    amount: 145.75,
    isPaid: false,
    address: 'C/ Ciencia 34, Madrid',
    email: 'resultados@labanalisis.com',
    taxId: 'A-12309876',
    reference: 'LA-2023-6789',
    paymentMethod: 'Tarjeta sanitaria',
    insuranceCoverage: 116.6,
    prescriptionInfo:
      'Análisis solicitados por Dra. Fernández, Medicina Interna, Colegiada nº 28007890',
    client: {
      name: 'Laura Pérez García',
      address: 'Av. Central 67, 5ºB, Madrid',
      email: 'laura.perez@email.com',
      insuranceInfo: 'Aseguradora: CompletaSalud - Póliza: CS-345678'
    },
    items: [
      {
        description: 'Hemograma completo',
        details: 'Análisis de células sanguíneas',
        quantity: 1,
        price: 35.25
      },
      {
        description: 'Bioquímica sanguínea',
        details: 'Perfil hepático, renal y metabólico',
        quantity: 1,
        price: 55.5
      },
      {
        description: 'Perfil tiroideo',
        details: 'TSH, T3 y T4',
        quantity: 1,
        price: 40.0
      },
      {
        description: 'Servicio de extracción a domicilio',
        details: 'Desplazamiento de personal sanitario',
        quantity: 1,
        price: 15.0
      }
    ]
  }
]

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}
