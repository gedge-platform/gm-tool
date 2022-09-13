import React from "react";

const CTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      //   style={{ height: 1000 }}
      role="tabpanel"
      hidden={value !== index}
      id={`ctabpanel-${index}`}
      className="tabPanel"
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export { CTabPanel };
