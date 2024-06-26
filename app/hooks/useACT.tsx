// Import components
import { useMemo } from 'react'

// Import our components
import ACT from '~/workers/interface'

// Import interfaces
// ...

export const useACT = () => useMemo(() => ACT.getInstance(), [])
