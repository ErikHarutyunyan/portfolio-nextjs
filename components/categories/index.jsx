import { useState } from "react";
import styles from "../../styles/Work.module.scss";

const Categories = ({ filterItems, allCategories }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive(e.target.id);
  };
  return (
    <div className={styles.projects_filter}>
      <div className={styles.projects_title}>
        <h2>Projects.</h2>
      </div>
      <div className={styles.projects_btn_container}>
        {allCategories.map((category, index) => {
          return (
            <button
              key={index}
              id={`${index}_category`}
              className={
                isActive === `${index}_category`
                  ? `${styles.projects_btn_filter} active_category`
                  : styles.projects_btn_filter
              }
              onClick={(e) => {
                filterItems(category);
                handleClick(e);
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
