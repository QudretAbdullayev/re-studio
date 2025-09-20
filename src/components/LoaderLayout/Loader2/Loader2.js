"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./Loader2/Loader2";
import Loader from "./Loader/Loader";
import { useScrollTracker } from "../UseScrollTracker/UseScrollTracker";

export default function CombinedLoader({children}) {
  const [stage, setStage] = useState("loadingScreen");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  const previousPathname = useRef(pathname);

  useScrollTracker(isLoadingComplete);

  useEffect(() => {
    setIsLoadingComplete(false);
    
    if (isFirstMount.current) {
      setStage("loadingScreen");
      isFirstMount.current = false;
      
      const timeout1 = setTimeout(() => {
        setStage("loader");
      }, 1700);

      const timeout2 = setTimeout(() => {
        setStage("done");
        setIsLoadingComplete(true);
      }, 3100);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    } else {
      
      setStage("stairsUp");
      
      const timeout1 = setTimeout(() => {
        setStage("loadingScreen");
      }, 1400);

      const timeout2 = setTimeout(() => {
        setStage("loader");
      }, 3100);

      const timeout3 = setTimeout(() => {
        setStage("done");
        setIsLoadingComplete(true);
      }, 4400);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [pathname]);



  if (stage === "stairsUp") return <Loader isReversed={true} />;
  if (stage === "loadingScreen") return <LoadingScreen/>;
  if (stage === "loader") return <Loader/>;
  
  return <>{children}</>;
}