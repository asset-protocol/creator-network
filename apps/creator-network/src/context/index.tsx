import type { ReactElement } from 'react'
import { createContext } from 'react'
import { AntdConfigProvider } from './antd'
import { AuthProvider } from './auth'
import { AppProvider } from './apollo'
// 集成多个context,对外提供一个provider
const AllContext = createContext({})
const AllContextProvider = ({ children }: { children: ReactElement }) => (
  <AllContext.Provider value={{}}>
    <AntdConfigProvider>
      <AuthProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </AuthProvider>
    </AntdConfigProvider>
  </AllContext.Provider>
)

export default AllContextProvider
