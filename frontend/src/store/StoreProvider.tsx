import { ReactNode } from 'react'

interface StoreProviderProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  // The zustand store doesn't need a provider, but we can use this
  // for initialization or other global setup
  return <>{children}</>
}