'use client'
import { useEffect, useState } from "react";

export default function HeaderOffset() {
  const [headerOffset, setHeaderOffset] = useState(123);
  useEffect(() => {
    function resizeScreen() {
      const element = document.body.getElementsByTagName("header")[0];
      setHeaderOffset(element?.clientHeight ?? 123);
    }
    window.addEventListener("resize", resizeScreen);
    resizeScreen();
    return () => window.removeEventListener("resize", resizeScreen);
  }, []);
  return <div style={{paddingTop: `${headerOffset}px`}}></div>;
}
