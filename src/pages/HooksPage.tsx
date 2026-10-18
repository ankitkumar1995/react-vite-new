import { useState, type ReactNode } from 'react'
import UseIdDemo from '../hooks/react18/useIdHook'
import UseTransitionDemo from '../hooks/react18/useTransitionHook'
import UseDeferredValueDemo from '../hooks/demos/useDeferredValueDemo'
import UseSyncExternalStoreDemo from '../hooks/demos/useSyncExternalStoreDemo'
import UseInsertionEffectDemo from '../hooks/demos/useInsertionEffectDemo'
import UseActionStateDemo from '../hooks/demos/useActionStateDemo'
import UseFormStatusDemo from '../hooks/demos/useFormStatusDemo'
import UseOptimisticDemo from '../hooks/demos/useOptimisticDemo'
import UseDemo from '../hooks/demos/useDemo'

interface HookDetail {
  name: string
  description: string
  example: string
  category: string
  component: ReactNode
}

const hooksData: HookDetail[] = [
  { name: 'useId', category: 'General', description: 'Generating unique IDs for accessibility attributes.', example: 'const id = useId();', component: <UseIdDemo /> },
  { name: 'useTransition', category: 'Performance', description: 'Lets you update the state without blocking the UI.', example: 'const [isPending, startTransition] = useTransition();', component: <UseTransitionDemo /> },
  { name: 'useDeferredValue', category: 'Performance', description: 'Lets you defer updating a part of the UI.', example: 'const deferredValue = useDeferredValue(text);', component: <UseDeferredValueDemo /> },
  { name: 'useSyncExternalStore', category: 'State', description: 'Lets you subscribe to an external store.', example: 'const data = useSyncExternalStore(subscribe, getSnapshot);', component: <UseSyncExternalStoreDemo /> },
  { name: 'useInsertionEffect', category: 'Effect', description: 'Version of useEffect for CSS-in-JS libraries.', example: 'useInsertionEffect(() => { /* insert styles */ }, []);', component: <UseInsertionEffectDemo /> },
  { name: 'useActionState', category: 'Forms', description: 'Manage state for form actions including pending and error states.', example: 'const [state, formAction, isPending] = useActionState(fn, initial);', component: <UseActionStateDemo /> },
  { name: 'useFormStatus', category: 'Forms', description: 'Access status of the last form submission in child components.', example: 'const { pending, data, method, action } = useFormStatus();', component: <UseFormStatusDemo /> },
  { name: 'useOptimistic', category: 'Forms', description: 'Show an optimistic state while an async action is in progress.', example: 'const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);', component: <UseOptimisticDemo /> },
  { name: 'use', category: 'General', description: 'Read the value of a resource like a Promise or Context.', example: 'const data = use(promise);', component: <UseDemo /> },
]

const HooksPage = () => {
  const [activeHook, setActiveHook] = useState<HookDetail>(hooksData[0])

  return (
    <div className="w-full py-8">
      <div className="md:flex md:items-start md:space-x-12">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-64 space-y-1 flex-shrink-0">
          <h2 className="text-xl font-black text-slate-900 mb-6 px-4">React Hooks</h2>
          {hooksData.map((hook) => (
            <button
              key={hook.name}
              onClick={() => setActiveHook(hook)}
              className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                activeHook.name === hook.name
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {hook.name}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="mt-12 md:mt-0 flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center space-x-3 mb-8">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {activeHook.category}
                </span>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{activeHook.name}</h1>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  {activeHook.description}
                </p>

                <div className="mt-10">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Example Usage</h3>
                  <div className="relative">
                    <pre className="bg-slate-900 rounded-xl p-6 overflow-x-auto border border-slate-800 shadow-lg">
                      <code className="text-blue-300 font-mono text-sm leading-6">
                        {activeHook.example}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separate Card for Full Demo */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 sm:p-12">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Full demo</h3>
              <div className="bg-slate-50/50 rounded-2xl p-8 border border-dashed border-slate-200 shadow-inner">
                {activeHook.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HooksPage
