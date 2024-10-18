import React, { useCallback } from "react";
import classNames from "classnames";

const BackButton = ({ title = "Back", classnames = "" }) => {
  const handleBack = useCallback(() => window.history.back(), []);

  return (
    <button onClick={handleBack} className={classNames("", classnames)}>
      {title}
    </button>
  );
};

export default BackButton;
