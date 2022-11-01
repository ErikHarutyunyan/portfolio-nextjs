import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
// Pages
const DynamicHeroSection = dynamic(() =>
  import("../pages-sections/HeroSection")
);
const DynamicAboutSection = dynamic(() =>
  import("../pages-sections/AboutSection")
);
const DynamicWorkSection = dynamic(() =>
  import("../pages-sections/WorkSection")
);
// import HeroSection from "../pages-sections/HeroSection";
// import AboutSection from "../pages-sections/AboutSection";
// import WorkSection from "../pages-sections/WorkSection";
// Components
const DynamicLoader = dynamic(() => import("../components/loader"));
// import Loader from "../components/loader";
const DynamicCursor = dynamic(() => import("../components/customCursor"));
// import Cursor from "../components/customCursor";

export default function Home() {
  let aboutCanvasWrapper = useRef(false);
  const [isLoader, setLoader] = useState(true);

  const hero = useRef(null);
  const about = useRef(null);
  const work = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(() => setLoader(false), 3500);
  }, []);

  return (
    <>
      <main>
        {isLoader && <DynamicLoader />}
        <DynamicCursor />
        <DynamicHeroSection
          hero={hero}
          scrollToSection={scrollToSection}
          about={about}
          work={work}
        />
        <DynamicAboutSection
          aboutCanvasWrapper={aboutCanvasWrapper}
          about={about}
          work={work}
          scrollToSection={scrollToSection}
        />
        <DynamicWorkSection work={work} scrollToSection={scrollToSection} />
        <Script src="./js/main.js" />
      </main>
    </>
  );
}
