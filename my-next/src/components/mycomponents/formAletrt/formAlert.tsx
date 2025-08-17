import { CheckCircle } from "lucide-react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Alert({
  type,
  message,
}: {
  type: "error" | "success";
  message: string | undefined;
}) {
  const theme = {
    error: "bg-red-100 text-red-900 border-red-200",
    success: "bg-green-100 text-green-900 border-green-200",
  };
  return (
    <div className={`${theme[type]} flex items-center p-3 gap-2 w-full`}>
      {type === "error" ? (
        <FaExclamationTriangle className="text-red-500" />
      ) : (
        <CheckCircle className="text-green-500" />
      )}
      <span>{message}</span>
    </div>
  );
}
