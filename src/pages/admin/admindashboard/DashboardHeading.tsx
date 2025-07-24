import React from "react";
import "./dashboardHeading.css";

interface DashboardHeadingProps {
  heading: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const DashboardHeading: React.FC<DashboardHeadingProps> = ({
  heading,
  buttonText,
  onButtonClick,
}) => {
  return (
    <section className="adminTableHeaderSection">
      <div className="adminTableHeaderContent">
        <h3 className="adminTableTitle">{heading}</h3>
        <button className="adminTableBtn" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default DashboardHeading;
