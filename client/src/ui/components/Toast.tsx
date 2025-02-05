import { useEffect, useState } from "react";
import { CrossIcon, SuccessIcon, ErrorIcon } from "../../assets/icons";

type ToastProps = {
  message: string; // Main message
  type: "SUCCESS" | "ERROR"; // Toast type
  onClose: () => void; // Function to close the toast
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false); // Tracks if toast is sliding out

  useEffect(() => {
    const autoCloseTimer = setTimeout(() => {
      handleClose(); // Trigger slide-out animation and close
    }, 5000);

    return () => clearTimeout(autoCloseTimer);
  }, []);

  const handleClose = () => {
    setIsClosing(true); // Trigger slide-out animation
    setTimeout(onClose, 500); // Close after animation ends (500ms)
  };

  const borderColor =
    type === "SUCCESS" ? "var(--succes-color)" : "var(--error-color)";

  return (
    <div
      data-testid={message}
      className={`fixed top-4 right-4 z-50 flex items-center gap-x-[4rem] p-4 shadow-md rounded-md bg-white ${
        isClosing ? "animate-slide-out" : "animate-slide-in"
      }`}
      style={{ borderLeft: `12px solid ${borderColor}` }}
    >
      <div className="flex items-center gap-x-4">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full`}
        >
          {type === "SUCCESS" ? (
            <SuccessIcon stroke={borderColor} />
          ) : (
            <ErrorIcon stroke={borderColor} />
          )}
        </div>

        {/* Text */}
        <div>
          <h3>{type === "SUCCESS" ? "Success" : "Failed"}</h3>
          <span>{message}</span>
        </div>
      </div>

      {/* Close Button */}
      <div
        onClick={handleClose}
        className="w-8 h-8 hover:opacity-70 cursor-pointer"
      >
        <CrossIcon stroke="#333" />
      </div>
    </div>
  );
};

export default Toast;
