function DashboardPage() {
  return (
    <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
      <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold bg-transparent rounded-md z-[1000]">
          <span className="text-blue-800 text-shadow-lg">Life</span>
          <span className="text-gray-800 text-shadow-lg">Rank</span>
        </div>
        <h1 className="text-xl font-semibold text-center text-gray-800 mt-8">This is Dashboard</h1>
      </div>
    </div>
  );
}

export default DashboardPage;
