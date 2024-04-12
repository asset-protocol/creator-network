import Content from "@/components/Content"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Contacts from "@/components/Contacts"

export default function Home(): JSX.Element {
  return (
    <main className="w-full h-full">
      <Header />
      <Content />
      <Contacts />
      <Footer />
    </main>
  )
}