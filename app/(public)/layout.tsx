import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// app/admin/layout.tsx
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">

      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}