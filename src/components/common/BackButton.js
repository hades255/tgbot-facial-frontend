import React, { useCallback } from "react";
import classNames from "classnames";

const BackButton = ({ title = "Back", classnames = "" }) => {
  const handleBack = useCallback(() => window.history.back(), []);

  return (
    <button
      onClick={handleBack}
      className={classNames(
        "border rounded px-2 text-white font-bold",
        classnames
      )}
      dangerouslySetInnerHTML={{ __html: title }}
    ></button>
  );
};

export default BackButton;
