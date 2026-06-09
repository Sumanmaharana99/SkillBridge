import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        {children}
      </main>
    </>
  );
}

export default MainLayout;