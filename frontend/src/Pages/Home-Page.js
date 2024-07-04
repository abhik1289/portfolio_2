import About from "../components/About";
import Blogs from "../components/Blogs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HomeBlog from "../components/HomeBlog";
import Offer from "../components/Offer";
import Service from "../components/Service";

function HomePage() {
    return (<>
    <Header/>
    <Hero/>
    <About/>
    <Service/>
    <Offer/>
    <Contact/>
 <HomeBlog/>
    <Footer/>
    </>);
}

export default HomePage;