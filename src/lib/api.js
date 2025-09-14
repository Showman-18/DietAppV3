import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// In-memory mock data for standalone UI mode
let MOCK_PATIENTS = [
  { id: 'p1', name: 'Anita Verma', age: 32, gender: 'F', diet: 'Veg', visits: 3 },
  { id: 'p2', name: 'Rahul Gupta', age: 40, gender: 'M', diet: 'Non-veg', visits: 1 },
  { id: 'p3', name: 'Neha Sharma', age: 28, gender: 'F', diet: 'Veg', visits: 5 },
]
let MOCK_RECORDS = [
  { id: 'r1', patientName: 'Anita Verma', note: 'Improved adherence; reduce pungent foods.', date: '2024-12-10' },
  { id: 'r2', patientName: 'Rahul Gupta', note: 'Focus on Kapha pacifying breakfast.', date: '2024-12-06' },
  { id: 'r3', patientName: 'Neha Sharma', note: 'Increase warm water intake; add cumin-fennel tea.', date: '2024-12-01' },
]

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 200))
      return MOCK_PATIENTS
    },
  })
}

export function useCreatePatient() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data) => {
      await new Promise(r => setTimeout(r, 200))
      const p = { id: `p${Date.now()}`, visits: 0, ...data }
      MOCK_PATIENTS = [p, ...MOCK_PATIENTS]
      return p
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}

export function useRecords() {
  return useQuery({
    queryKey: ['records'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 200))
      return MOCK_RECORDS
    },
  })
}

export function useGenerateDiet() {
  return useMutation({
    mutationFn: async (data) => {
      await new Promise(r => setTimeout(r, 250))
      const base = [
        { title: 'Morning (7:30 AM)', items: ['Warm water with lemon', 'Stewed apple'] },
        { title: 'Breakfast (9:00 AM)', items: ['Moong dal chilla', 'Mint chutney'] },
        { title: 'Lunch (1:00 PM)', items: ['Red rice', 'Lauki sabzi', 'Buttermilk'] },
        { title: 'Snack (4:30 PM)', items: ['Roasted chana', 'Herbal tea'] },
        { title: 'Dinner (7:30 PM)', items: ['Khichdi', 'Ghee', 'Cumin fennel tea'] },
      ]
      const meals = (data?.frequency ?? 3) > 3 ? [...base, { title: 'Bedtime', items: ['Golden milk'] }] : base
      return { meals }
    },
  })
}
