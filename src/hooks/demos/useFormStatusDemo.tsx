import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, action,data,method} = useFormStatus()
  console.log('Form status:', { pending, action, data, method })
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
    >
      {pending ? 'Submitting Form...' : 'Submit Form'}
    </button>
  )
}

export default function useFormStatusDemo() {
  async function action() {
    await new Promise(res => setTimeout(res, 2000))
  }

  return (
    <form action={action} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase">Input Field</label>
        <input className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type something..." />
      </div>
      <SubmitButton />
      <p className="text-[10px] text-slate-400 text-center font-medium italic">
        The button above uses useFormStatus from react-dom.
      </p>
    </form>
  )
}
