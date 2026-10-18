import { useOptimistic, useState } from 'react'

export default function useOptimisticDemo() {
  const [messages, setMessages] = useState([
    { text: 'Hello!', sending: false },
  ])

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      { text: newMessage, sending: true },
    ]
  )

  async function sendMessage(formData: FormData) {
    const sentMessage = formData.get('message') as string
    addOptimisticMessage(sentMessage)
    
    // Simulate API call
    await new Promise(res => setTimeout(res, 2000))
    
    setMessages(prev => [...prev, { text: sentMessage, sending: false }])
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 max-h-48 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        {optimisticMessages.map((m, i) => (
          <div key={i} className={`flex ${m.sending ? 'opacity-50' : ''}`}>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-sm">
              {m.text} {m.sending && '...sending'}
            </span>
          </div>
        ))}
      </div>
      <form action={sendMessage} className="flex gap-2">
        <input 
          name="message" 
          placeholder="Optimistic message..." 
          className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors">
          Send
        </button>
      </form>
    </div>
  )
}
