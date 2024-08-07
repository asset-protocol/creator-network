import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { indexerClient } from '../creatornetwork';
import { AppHeader } from '../components/layout/AppHeader';
import clsx from 'clsx';
import { AppProviders } from '../components/layout/AppRoot';
import { Affix, Layout } from 'antd';
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body className={clsx(inter.className)}>
        <AntdRegistry>
          <AntThmeConfigProvider>
            <AppProviders manager={manager}>
              <Layout>
                <Affix>
                  <AppHeader />
                </Affix>
                <Content className="w-full bg-white">{children}</Content>
              </Layout>
            </AppProviders>
          </AntThmeConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
