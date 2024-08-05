import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { indexerClient } from '../creatornetwork';
import { AppHeader } from '../components/layout/AppHeader';
import clsx from 'clsx';
import { AppProviders } from '../components/layout/AppRoot';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AntThmeConfigProvider } from '../components/layout/AntConfig';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/creatornetwork/storage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asset Scan',
  description: 'Asset Scan',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const manager = await indexerClient().manager.fetchHubManager();
  return (
    <html lang="en" className="bg-white">
      <body className={clsx(inter.className)}>
        <AntdRegistry>
          <AntThmeConfigProvider>
            <AppProviders manager={manager}>
              <Layout>
                <AppHeader />
                <Content className="w-full bg-white">{children}</Content>
              </Layout>
            </AppProviders>
          </AntThmeConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
