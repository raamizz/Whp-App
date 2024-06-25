"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useIdleTimer from "./useIdleTime";
import axios from "axios";
import { baseUrl, userTracking } from "@/utils/constants";
import { useUser } from "@/context/UserContext";

type ClickHistory = {
  x: number;
  y: number;
};

const useUserTracking = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>("");
  const [timeOnPage, setTimeOnPage] = useState<number>(0);
  // const [pageHeader, setPageHeader] = useState<string>("");
  const [clicksOnPage, setClicksOnPage] = useState<number>(0);
  const [clickHistory, setClickHistory] = useState<ClickHistory[]>([]);
  const [nextPageId, setNextPageId] = useState<string | null>(null);
  const [apiCalled, setApiCalled] = useState(false);
  const isIdle = useIdleTimer(180000);
  const [post, setPost] = useState<any>({});
  const { userDetails } = useUser();

  const callTrackingApi = async (postData: any) => {
    console.log("PostDAta", postData);
    try {
      const response: any = await axios.post(
        `${baseUrl}${userTracking}`,
        postData
      );
      console.log("Response for UserTracking", response.data);
      if (postData.isIdle === 1) {
        setNextPageId(null);
      } else {
        setNextPageId(response.data.pageId);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const updatePageTimer = () => {
      if (window.location.href !== currentPage) {
        const array = JSON.parse(
          window.localStorage.getItem("activity_ids") || "[]"
        );
        setCurrentPage(window.location.href);
        // const header = Helmet.peek();
        // setPageHeader(header.title);

        setTimeOnPage((prevTimeOnPage) => {
          const postData = {
            user_email: userDetails?.email || null,
            // header: pageHeader,
            current_url: currentPage,
            time_spend: prevTimeOnPage,
            no_of_clicks: clicksOnPage,
            click_history: clickHistory,
            next_page: nextPageId,
            isIdle,
          };

          setPost(postData);

          console.log(
            `Time spent on ${currentPage} page is ${prevTimeOnPage} second`
          );
          console.log("Clicks on Page", clicksOnPage, clickHistory);
          callTrackingApi(postData);

          return 0;
        });
        setClicksOnPage(0);
        setClickHistory([]);
      } else {
        setTimeOnPage((prevTimeOnPage) => prevTimeOnPage + 1);
      }
    };

    function onClick(e: MouseEvent) {
      setClickHistory((prevCoordinates) => [
        ...prevCoordinates,
        { x: e.pageX, y: e.pageY },
      ]);
      setClicksOnPage((prev) => prev + 1);
    }

    setApiCalled(false);
    window.addEventListener("click", onClick);

    timerId = setInterval(updatePageTimer, 1000);
    return () => {
      window.removeEventListener("click", onClick);
      clearInterval(timerId);
    };
  }, [currentPage, clicksOnPage]);

  useEffect(() => {
    if (isIdle && !apiCalled) {
      const array = JSON.parse(
        window.localStorage.getItem("activity_ids") || "[]"
      );
      const postData = {
        user_email: userDetails?.email || null,
        user_id: null,
        current_url: currentPage,
        time_spend: timeOnPage,
        no_of_clicks: clicksOnPage,
        click_history: clickHistory,
        next_page: nextPageId,
        isIdle,
        // header: pageHeader,
      };
      callTrackingApi(postData);
      setApiCalled(true);
      setNextPageId(null);
    }
  }, [isIdle]);

  return post;
};
export default useUserTracking;
