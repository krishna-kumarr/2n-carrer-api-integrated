import React from "react";

const Button = ({ className, title, testId , buttonType, functionOnchange, disable}) => {
  return (
    <button className={className} type={buttonType} onClick={functionOnchange} data-testid={testId} disabled={disable===true ? "disabled" : null}>
      {title}
    </button>
  );
};

export default Button;
