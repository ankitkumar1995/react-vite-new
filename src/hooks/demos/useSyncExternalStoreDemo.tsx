import { useSyncExternalStore } from 'react'

const store = {
  state: { width: window.innerWidth },
  listeners: new Set<() => void>(),
  subscribe(callback: () => void) {
    store.listeners.add(callback)
    window.addEventListener('resize', callback)
    return () => {
      store.listeners.delete(callback)
      window.removeEventListener('resize', callback)
    }
  },
  getSnapshot() {
    return store.state.width
  }
}

export default function useSyncExternalStoreDemo() {
  const width = useSyncExternalStore(store.subscribe, () => window.innerWidth)

  return (
    <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
      <p className="text-sm font-bold text-blue-600 uppercase mb-2">Window Width</p>
      <p className="text-4xl font-black text-blue-900">{width}px</p>
      <p className="text-xs text-blue-500 mt-4 italic font-medium">Try resizing your browser window!</p>
    </div>
  )
}
