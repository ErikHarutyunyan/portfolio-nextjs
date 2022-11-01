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
      <Head>
        <div>
          <meta charSet="UTF-8" />
          <meta name="description" content="My Portfolio" />
          <meta name="keywords" content="NextJs, React, JavaScript" />
          <meta name="author" content="Erik Harutyunyan" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Portfolio" />
          <meta
            property="og:description"
            content="Portfolio Erik Harutyunyan"
          />
          <meta property="og:image" content="/img/common/ogp_sun.jpg" />
          <meta property="og:site_name" content="Portfolio Erik Harutyunyan" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Portfolio" />
          <meta
            name="twitter:description"
            content="Portfolio Erik Harutyunyan"
          />
          <meta name="twitter:image" content="/img/common/ogp_sun.jpg" />
          <title>Portfolio</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7b7b7b" />
          <meta name="msapplication-TileColor" content="#220600" />
          <meta name="theme-color" content="#220600" />
        </div>
      </Head>
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
