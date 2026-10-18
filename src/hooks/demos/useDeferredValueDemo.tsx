import { useState, useDeferredValue, useEffect } from 'react'

export default function useDeferredValueDemo() {
  const [input, setInput] = useState('')
  const deferredInput = useDeferredValue(input)
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [apiCallCount, setApiCallCount] = useState(0)

  // Simulated API call - happens when deferredInput changes
  useEffect(() => {
    if (!deferredInput) {
      setResults([])
      return
    }

    setLoading(true)
    // Simulate API delay
    const timer = setTimeout(() => {
      setApiCallCount(prev => prev + 1)
      // Mock search results
      const mockResults = [
        `Result for "${deferredInput}" - Match 1`,
        `Result for "${deferredInput}" - Match 2`,
        `Result for "${deferredInput}" - Match 3`,
      ]
      setResults(mockResults)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [deferredInput])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Search (with useDeferredValue)
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type to search..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="p-3 bg-blue-50 rounded border border-blue-200">
          <p className="font-bold text-blue-900">Immediate Input:</p>
          <p className="text-blue-700 break-all">{input || '(empty)'}</p>
        </div>
        <div className="p-3 bg-purple-50 rounded border border-purple-200">
          <p className="font-bold text-purple-900">Deferred Value:</p>
          <p className="text-purple-700 break-all">{deferredInput || '(empty)'}</p>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-slate-600">
            Results (API calls: {apiCallCount})
          </p>
          {loading && <p className="text-xs text-amber-600">Fetching...</p>}
        </div>
        <ul className="space-y-2">
          {results.length > 0 ? (
            results.map((result, idx) => (
              <li key={idx} className="text-sm text-slate-700 p-2 bg-white rounded border border-slate-200">
                {result}
              </li>
            ))
          ) : (
            <li className="text-sm text-slate-500 italic">No results yet...</li>
          )}
        </ul>
      </div>

      <div className="text-xs text-slate-600 bg-slate-100 p-3 rounded">
        <p className="font-semibold mb-1">💡 Why useDeferredValue helps:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Type fast - input updates immediately (good UX)</li>
          <li>API calls only trigger after you stop typing (debounced via deferring)</li>
          <li>Without it: every keystroke triggers an API call</li>
        </ul>
      </div>
    </div>
  )
}
