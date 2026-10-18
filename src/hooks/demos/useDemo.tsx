import { use, Suspense } from 'react'

const dataPromise = new Promise<{ message: string }>(res => 
  setTimeout(() => res({ message: 'Success! Value read via use() hook.' }), 3000)
)

function DataDisplay() {
  const data = use(dataPromise)
  console.log('Data received:', data)
  return (
    <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-green-800 font-bold text-center">
      {data.message}
    </div>
  )
}

export default function useDemo() {
  return (
    <div className="space-y-4">
      <Suspense fallback={
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 font-bold text-center animate-pulse">
          Loading resource via use()...
        </div>
      }>
        <DataDisplay />
      </Suspense>
    </div>
  )
}
