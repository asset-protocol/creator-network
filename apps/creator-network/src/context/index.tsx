import type { ReactElement } from 'react'
import { createContext } from 'react'
import { AntdConfigProvider } from './antd'
import { AppProvider } from './app'
import { AssetHub } from './assethub/AssetHub'
// 集成多个context,对外提供一个provider
const AllContext = createContext({})
const AllContextProvider = ({ children }: { children: ReactElement }) => (
  <AllContext.Provider value={{}}>
    <AntdConfigProvider>
      <AppProvider>
        <AssetHub>
          {children}
        </AssetHub>
      </AppProvider>
    </AntdConfigProvider>
  </AllContext.Provider>
)

export default AllContextProvider
