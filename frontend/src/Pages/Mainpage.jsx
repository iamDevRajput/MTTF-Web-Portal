import Header from "../Components/Header";
import Hero from "../Components/Hero";
import HomepageFeatures from "../Components/HomepageFeatures";
import Footer from "../Components/Footer";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />
        <HomepageFeatures />
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
