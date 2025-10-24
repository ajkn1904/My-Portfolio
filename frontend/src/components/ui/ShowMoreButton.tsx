import { ArrowRight } from "lucide-react";

export default function ShowMoreButton() {
  return (
    <>
      <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2 text-lg transition-all duration-300 hover:shadow-md shadow-purple-700 flex items-center gap-2 overflow-hidden">
        Show More
        <span className="arrow-wrapper">
          <ArrowRight size={20} />
        </span>
      </button>

      <style jsx>{`
        .arrow-wrapper {
          display: inline-block;
          animation: slide-right 1s ease-in-out infinite;
        }
        @keyframes slide-right {
          0% { transform: translateX(0); }
          50% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
