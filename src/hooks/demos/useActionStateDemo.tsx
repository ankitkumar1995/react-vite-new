import { useActionState } from 'react'

async function increment(previousState: number) {
  await new Promise(res => setTimeout(res, 1000))
  return previousState + 1
}

export default function useActionStateDemo() {
  const [state, formAction, isPending] = useActionState(increment, 0)

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="text-center">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Current Count</p>
        <p className="text-5xl font-black text-slate-900">{state}</p>
      </div>
      
      <form action={formAction}>
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:scale-95 active:scale-95"
        >
          {isPending ? 'Incrementing...' : 'Increment Counter'}
        </button>
      </form>
      
      {isPending && (
        <p className="text-xs font-bold text-blue-500 animate-pulse">Running Server Action...</p>
      )}
    </div>
  )
}
