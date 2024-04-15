import { formateTime } from "./common";
import usePrayerTimes from "./hooks/usePrayerTimes";
import useCurrentPrayer from "./hooks/useCurrentPrayer";

function App() {
  const { prayerTimes, metaData, isLoading } = usePrayerTimes();
  const { currentPrayer } = useCurrentPrayer();
  const array = Object.entries(prayerTimes);

  return (
    <div className="bg-slate-800 min-h-screen text-white overflow-hidden flex flex-col items-center p-2 px-4">
      <h1 className="text-center m-6 text-3xl font-bold">Prayer Times</h1>

      {isLoading ? (
        <div className="flex justify-center items-center pt-4">
          <span className="h-8 w-8 rounded-full animate-spin border-4 border-emerald-300/50 border-t-emerald-300"></span>
        </div>
      ) : (
        <div className="w-full">
          <div className=" mx-auto bg-emerald-600 max-w-md w-full rounded mb-8 p-4 flex flex-col items-center">
            <h2 className="text-2xl mb-4 border-b-2 border-dotted border-white pb-2">
              Current Prayer
            </h2>
            {currentPrayer.name ? (
              <>
                <p className="font-bold text-xl">{currentPrayer.name}</p>
                <p>{currentPrayer.remaining}</p>
              </>
            ) : (
              "No prayer at the moment"
            )}
          </div>

          <div className="mb-4 text-xs text-center select-none">
            <p>Based on: {metaData.method.name}</p>
            <p>Location: {metaData.timezone}</p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-2 max-w-7xl mx-auto">
            {array.map((prayer) => (
              <div
                className={`${
                  prayer[0] === currentPrayer.name
                    ? "bg-emerald-600"
                    : "bg-slate-700"
                } p-4 rounded flex flex-col items-center max-w-xm`}
                key={prayer[0]}
              >
                <p className="font-bold text-xl mb-2 ">{prayer[0]}</p>

                <hr className="border-0 border-b-2 border-dotted border-current w-1/2 mb-4" />

                <div className="flex flex-wrap items-center flex-col leading-5">
                  <span>{formateTime(prayer[1].from)}</span>
                  <span>↓</span>
                  <span>{formateTime(prayer[1].to)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
