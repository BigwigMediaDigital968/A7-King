import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RefreshButton from "./Components/Global/RefreshButton";
import ScrollToTop from "./Components/Global/ScrollToTop";

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
      <RefreshButton/>
      <ScrollToTop/>
    </div>
  );
}