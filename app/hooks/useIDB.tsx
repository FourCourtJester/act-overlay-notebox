// Import components
import { useMemo } from 'react'

// Import our components
import { IDB } from '~/components/idb'

// Import interfaces
// ...

export const useIDB = () => useMemo(() => IDB.getInstance(), [])
