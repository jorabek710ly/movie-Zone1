import { Suspense } from "react";
import MainRouter from "./pages";

const App = () => {
  const Loader = () => (
    <div className="flex items-center justify-center h-screen w-full bg-slate-100 dark:bg-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-700"></div>
        <p className="text-lg font-semibold text-red-700">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="dark:bg-black dark:text-white bg-slate-100 min-h-screen">
      <Suspense fallback={<Loader />}>
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;