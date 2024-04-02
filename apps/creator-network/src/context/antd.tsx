import ConfigProvider from 'antd/lib/config-provider'
import 'antd/dist/reset.css'
import type { ReactNode } from 'react'
import { theme } from 'antd'
const { darkAlgorithm, compactAlgorithm } = theme

export const AntdConfigProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider
    theme={{
      algorithm: [darkAlgorithm, compactAlgorithm],
    }}
  >
    {children}
  </ConfigProvider>
)
