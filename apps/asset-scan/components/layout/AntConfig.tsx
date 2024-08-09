'use client';
import ConfigProvider, { ThemeConfig } from 'antd/es/config-provider';
import React from 'react';

const bg = '#E8F3F3';

const AntTheme: ThemeConfig = {
  token: {
    colorPrimary: '#00AAA1',
    colorPrimaryText: '#FFFFFF',
    colorBorder: '#999999',
    borderRadius: 4,
    colorBgContainer: 'transparent',
    colorLinkHover: '#00AAA1',
    fontSize: 16,
    colorText: '#000000',
    colorLink: '#000000',
  },
  components: {
    Button: {
      paddingContentHorizontal: 20,
      paddingContentVertical: 10,
      colorLink: '#00AAA1',
    },
    Layout: {
      headerBg: bg,
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
