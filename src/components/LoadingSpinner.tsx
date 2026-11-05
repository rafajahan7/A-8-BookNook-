
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#173B57] rounded-full animate-spin"></div>

      <p className="text-gray-500 mt-4">
        Loading, please wait...
      </p>
    </div>
  );
}
