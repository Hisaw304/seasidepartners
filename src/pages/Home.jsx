import React from "react";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import PracticeAreas from "../components/PracticeAreas";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <PracticeAreas />
      <Faq />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
