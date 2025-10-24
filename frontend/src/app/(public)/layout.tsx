import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";



export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[61.6vh] md:min-h-[73.3vh] mt-20 md:mt-0 md:ml-24">{children}</main>
      <Footer />
    </>
  );
}
