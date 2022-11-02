import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Components
const DynamicMenu = dynamic(() => import("../components/projects"));
const DynamicCategories = dynamic(() => import("../components/categories"));
const DynamicSidebar = dynamic(() => import("../components/sidebar"));
// import Menu from "../components/projects";
// import Categories from "../components/categories";
import items from "../components/data/dataProjects";
// import Sidebar from "../components/sidebar";
// Style
import { section, workSection } from "../styles/Work.module.scss";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

export default function WorkSection() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState(items);

  const [sideBar, setSideBar] = useState(false);

  const [project, setProject] = useState(null);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category == category);
    setMenuItems(newItems);
  };

  const bodyOverflow = () => {
    if (!sideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <section className={workSection}>
      <div className={section}>
        <DynamicCategories
          allCategories={allCategories}
          filterItems={filterItems}
        />
        <DynamicMenu
          {...{ sideBar, setSideBar, menuItems, setProject, bodyOverflow }}
        />
      </div>
      <DynamicSidebar
        {...{ sideBar, setSideBar, menuItems, project, bodyOverflow }}
      />
      <span onClick={() => router.push('/')} className="back">
        &#60;
      </span>
    </section>
  );
}
