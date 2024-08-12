import React, { useEffect, useState } from "react";

function TimeBar({ totalTimeInMill, onExpire }) {
  const [startDate, setStartDate] = useState(Date.now());
  const [totalTime, setTotalTime] = useState(totalTimeInMill);
  const [remainTimeInMill,setRemainTime] = useState(totalTimeInMill);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    function calculateRemainTime() {
      const currentDate = Date.now()
      const passedTime = currentDate - startDate
      setRemainTime(
        totalTime - passedTime
      );
    }
    if(remainTimeInMill <=0 && !isExpired){
        setIsExpired(true);
        onExpire();
    }
    else if (remainTimeInMill > 0 && !isExpired) {
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

export { TimeBar };
