'use client'

import {ReactNode} from 'react'
import { SessionProvider } from 'next-auth/react'

type ProviderProps = {
  children: ReactNode;
}

const Providers = ({children}: ProviderProps) => <SessionProvider>{children}</SessionProvider>

export default Providers
