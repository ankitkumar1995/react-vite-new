import { useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react'

export default function useInsertionEffectDemo() {
  const [color, setColor] = useState('blue')

  useLayoutEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .dynamic-box {
        background-color: ${color === 'blue' ? '#dbeafe' : '#fef3c7'};
        border: 2px solid ${color === 'blue' ? '#3b82f6' : '#f59e0b'};
        color: ${color === 'blue' ? '#1e40af' : '#92400e'};
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [color])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="dynamic-box w-full p-8 rounded-2xl text-center font-black transition-all duration-500">
        DYNAMIC STYLED BOX
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setColor('blue')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm"
        >
          Blue Style
        </button>
        <button 
          onClick={() => setColor('amber')}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold text-sm"
        >
          Amber Style
        </button>
      </div>
    </div>
  )
}
