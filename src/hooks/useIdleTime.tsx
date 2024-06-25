import { useState, useEffect } from "react";

const useIdleTimer = (idleTime: number): number => {
  const [isIdle, setIsIdle] = useState<number>(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetIdleTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {

        setIsIdle(1);
      }, idleTime);
    };

    const onActivity = () => {

      setIsIdle(0);
      resetIdleTimer();
    };

    document.addEventListener("mousemove", onActivity);
    document.addEventListener("keydown", onActivity);
    document.addEventListener("scroll", onActivity);

    resetIdleTimer();

    return () => {
      document.removeEventListener("mousemove", onActivity);
      document.removeEventListener("keydown", onActivity);
      document.removeEventListener("scroll", onActivity);

      clearTimeout(timeoutId);
    };
  }, [idleTime]);

  return isIdle;
};

export default useIdleTimer;
