import { useTransition } from 'react'

export default function useTransitionHooks() {
  const [isPending, startTransition] = useTransition();
  console.log(isPending, startTransition);
  return (
    <div>

    </div>
  )
}
