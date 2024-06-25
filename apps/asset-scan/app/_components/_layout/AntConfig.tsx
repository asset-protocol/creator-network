`use client`;
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ConfigProvider, { ThemeConfig } from 'antd/es/config-provider';

const AntTheme: ThemeConfig = {
  token: {
    colorPrimary: '#00AAA1',
    colorPrimaryText: '#FFFFFF',
    colorBorder: '#999999',
    borderRadius: 4,
    colorBgContainer: 'transparent',
    colorLinkHover: '#00AAA1',
    fontSize: 16,
  },
  components: {
    Button: {
      paddingContentHorizontal: 20,
      paddingContentVertical: 10,
      colorLink: '#00AAA1',
    },
  },
};

export function AntThmeConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider theme={AntTheme}>{children}</ConfigProvider>;
}
