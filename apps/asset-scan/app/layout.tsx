import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { indexerClient, useStorage } from "./_creatornetwork";
import { AppHeader } from "./_components/_layout/AppHeader";
import clsx from "clsx";
import { AppProviders } from "./_components/_layout/AppRoot";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asset Scan",
  description: "Asset Scan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useStorage();
  const manager = await indexerClient.manager.fetchHubManager();
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <AppProviders manager={manager}>
          <AntdRegistry>
            <Layout>
              <AppHeader />
              <Content className="w-full bg-base-100">
                {children}
              </Content>
            </Layout>
          </AntdRegistry>
        </AppProviders>
      </body>
    </html>
  );
}
