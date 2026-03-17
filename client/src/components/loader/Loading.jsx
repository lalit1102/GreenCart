import React, { useEffect } from "react";
import useAppContext from "../../context/useAppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate, setCartItem } = useAppContext();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (!nextUrl) return;

    const normalizedUrl = nextUrl.startsWith("/") ? nextUrl : `/${nextUrl}`;

    // For online payment success path, clear cart before redirect
    if (normalizedUrl === "/my-orders") {
      setCartItem({});
    }

    const timer = setTimeout(() => {
      navigate(normalizedUrl, { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [nextUrl, navigate, setCartItem]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-green-400"></div>
    </div>
  );
};

export default Loading;
