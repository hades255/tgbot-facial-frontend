import classNames from "classnames";
import React, { useCallback } from "react";

const Modal = ({
  show,
  onClose,
  title,
  children,
  className,
  showClose,
  blur = true,
}) => {
  const handleClickBlur = useCallback(() => onClose(false), [onClose]);

  const handleClickBody = useCallback((e) => e.stopPropagation(), []);

  return (
    show && (
      <div
        className={classNames(
          `fixed inset-0 h-screen flex justify-center items-end bg-[#0000005A] z-40 px-1`,
          {
            "animate-slideIn": show,
            "animate-slideOut": !show,
          }
        )}
        onClick={blur ? handleClickBlur : () => {}}
      >
        <div className="w-full flex flex-col">
          <div className="flex justify-center">
            <div
              className={classNames(
                {
                  "animate-slideUpIn": show,
                  "animate-slideUpOut": !show,
                },
                className
              )}
              onClick={handleClickBody}
            >
              <div className="flex justify-center items-center">
                <div className="text-[20px] font-medium text-white text-center">
                  {title}
                </div>
              </div>
              <div className="px-4">{children}</div>
            </div>
          </div>
          {showClose && (
            <div className="flex justify-center items-center mt-2 mb-4">
              <div
                onClick={handleClickBlur}
                className="w-12 h-[46px] rounded-[24px] bg-modal-close flex justify-center items-center text-white font-bold text-xl cursor-pointer shadow-[0_2px_2px_#0000001A,0_4px_0px_#ad2119] border-t-[1px] border-b-[1px] border-[#ff4346]"
              >
                X
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
