import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Style
import {
  hero_section,
  nav_section,
  nav_social,
} from "../styles/Hero.module.scss";

// Data Social
import items from "../components/data/dataSocial";
// Svg Icons
import { CodeSandBoxIcon, GitHubIcon, LinkedinIcon } from "../components/svg";

export default function HeroSection({ hero, scrollToSection, about, work }) {
  const router = useRouter();

  const handleClick = (text) => {
    // e.preventDefault();
    router.push(`/${text}`);
  };

  return (
    <section ref={hero} className={hero_section}>
      <canvas className="p-canvas-webgl" id="canvas-webgl"></canvas>
      <ul className={nav_section}>
        <li onClick={() => handleClick("about")}>
          <a>About</a>
        </li>
        <li onClick={() => handleClick("work")}>
          <a>Works</a>
        </li>
        <li>
          <a>Resumne</a>
        </li>
      </ul>
      <ul className={nav_social}>
        {items?.map((item, index) => {
          return (
            <li key={index}>
              <a
                href={item.url}
                aria-label={item.title}
                target="_blank"
                rel="noreferrer"
              >
                {item?.title === "GitHub" ? (
                  <GitHubIcon />
                ) : item?.title === "Linkedin" ? (
                  <LinkedinIcon />
                ) : item?.title === "CodeSandbox" ? (
                  <CodeSandBoxIcon />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="scroll-down" onClick={() => scrollToSection(about)}>
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </div>
    </section>
  );
}
