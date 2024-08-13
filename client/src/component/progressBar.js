import React, { useEffect, useState } from "react";

function TimeBar({ totalTimeInMill, onExpire }) {
  const [startDate, setStartDate] = useState(Date.now());
  const [totalTime, setTotalTime] = useState(totalTimeInMill);
  const [remainTimeInMill, setRemainTime] = useState(totalTimeInMill);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    function calculateRemainTime() {
      const currentDate = Date.now();
      const passedTime = currentDate - startDate;
      setRemainTime(totalTime - passedTime);
    }
    if (remainTimeInMill <= 0 && !isExpired) {
      setIsExpired(true);
      onExpire();
    } else if (remainTimeInMill > 0 && !isExpired) {
      setInterval(calculateRemainTime, 1000);
    }
  }, [isExpired, onExpire, remainTimeInMill, startDate, totalTime]);

  const percentage = (100 * remainTimeInMill) / totalTimeInMill;
  const ss = Math.floor(remainTimeInMill / 1000) % 60;
  const mm = Math.floor(remainTimeInMill / 1000 / 60) % 60;
  const hh = Math.floor(remainTimeInMill / 1000 / 60 / 60);
  const remainTimeString = `${hh}:${mm}:${ss}`;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-blue-700 dark:text-white">
          Remain Time
        </span>
        <span className="text-xs font-medium text-blue-700 dark:text-white">
          {remainTimeString}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function StageBar({ stageList, proceedIndex }) {
  const barList = [];
  for (let index in stageList) {
    const isComplete = index < proceedIndex
    const isProceed = index == proceedIndex
    const isPlanned = index > proceedIndex
    const newStageIndicator = (
      <li key={index} className="relative w-full my-10">
        <div className="flex items-center">
          <div className={`z-10 flex items-center justify-center  rounded-full ring-0 ring-white ${isComplete?" w-6 h-6 bg-blue-200 dark:bg-blue-900": isProceed? " w-6 h-6 bg-blue-400 dark:bg-blue-400": "w-6 h-6 bg-gray-200 dark:bg-gray-700"} sm:ring-8 dark:ring-gray-900 shrink-0`}>
            <span className={`flex w-3 h-3 rounded-full ${isPlanned ? "bg-gray-900": "bg-blue-600"}`}></span>
          </div>
          <div className={`flex w-full h-0.5 ${isComplete? "bg-blue-300 dark:bg-blue-600": "bg-gray-200 dark:bg-gray-700"}`}></div>
        </div>
        <div className="mt-3">
          <h3 className="font-medium text-gray-900 dark:text-white">{stageList[index]}</h3>
        </div>
      </li>
    );
    barList.push(newStageIndicator)
  }
  return (
    <ol className="flex items-start">
        {barList}
    </ol>
  );
}

export { TimeBar,StageBar };
