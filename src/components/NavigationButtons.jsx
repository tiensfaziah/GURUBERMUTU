import { useNavigate } from "react-router-dom";

export default function NavigationButtons({
  showBack = true,
  showForward = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full mb-6">

      <div>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            className="
              w-10 h-10
              rounded-xl
              bg-white
              border border-gray-200
              shadow-sm
              flex items-center justify-center
              text-gray-600
              hover:bg-gray-50
              transition
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      <div>
        {showForward && (
          <button
            onClick={() => navigate(1)}
            aria-label="Maju"
            className="
              w-10 h-10
              rounded-xl
              bg-white
              border border-gray-200
              shadow-sm
              flex items-center justify-center
              text-gray-600
              hover:bg-gray-50
              transition
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}