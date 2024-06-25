import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const SessionExpired = () => {
  const router = useRouter();
  const { logOut } = useUser();
  const handleSessionExpired = () => {
    logOut();
    router.push("/login");
  };
  return (
    <div className="fixed z-50 bg-black">
      <div>
        <p>Session Expired</p>
        <button onClick={() => handleSessionExpired()}>ok</button>
      </div>
    </div>
  );
};

export default SessionExpired;
