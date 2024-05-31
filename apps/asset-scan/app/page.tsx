import Image from "next/image";
import { AppProviders } from "./_components/_layout/AppRoot";

export default function Home() {
  return (
    <AppProviders>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>Home</div>
      </main>
    </AppProviders>
  );
}
