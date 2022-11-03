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
  return (
    <section ref={hero} className={hero_section}>
      <canvas className="p-canvas-webgl" id="canvas-webgl"></canvas>
      <ul className={nav_section}>
        <li>
          <a className="nav_item" href="/about">
            <span className="fire">A</span>
            <span className="burn">b</span>
            <span className="burn">o</span>
            <span className="burn">u</span>
            <span className="fire">t</span>
          </a>
        </li>
        <li>
          <a className="nav_item" href="/work">
            <span className="fire">W</span>
            <span className="burn">o</span>
            <span className="burn">r</span>
            <span className="fire">k</span>
          </a>
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
      {/* <div className="scroll-down" onClick={() => scrollToSection(about)}>
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </div> */}
    </section>
  );
}
