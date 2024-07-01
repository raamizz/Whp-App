import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  FirebaseError,
} from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { auth } from "./config";
import OTPInput from "react-otp-input";
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import axios from "../utils/axios";
import { signup, login } from "@/utils/constants";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";
import Preloader from "@/components/Other/Preloader";

interface OtpVerificationProps {
  phoneNumber: string;
  formikValues: any;
  onSubmit: (values: any) => void;
  isRegisterPage: boolean;
  errorMessage: string | any;
}

// class Token {
//   static token = "";
// }

const OtpVerification = ({
  formikValues,
  onSubmit,
  isRegisterPage,
}: OtpVerificationProps) => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { logIn, userState } = useUser();

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
  };

  const onSendOtp = async () => {
    if (!formikValues.phoneNumber) {
      console.error("Invalid phone number");
      return;
    }
    if (!window.recaptchaVerifier) {
      setUpRecaptcha();
    }
    try {
      setLoading(true);
      setFirebaseError(null);
      const result = await signInWithPhoneNumber(
        auth,
        "+" + formikValues.phoneNumber,
        window.recaptchaVerifier
      );
      setVerificationId(result.verificationId);
      setIsOtpSent(true); // Update state to indicate OTP has been sent
      setErrorMessage(null);
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
      if (error.message.includes("reCAPTCHA has already been rendered")) {
        window.location.href = location.pathname;
      } else {
        setErrorMessage("Invalid Number or Try again");
      }

      //  setFirebaseError(error.message);
    }
  };
  const onVerify = async (action: string) => {
    if (!verificationId || !otp) {
      console.error("Invalid verification ID or OTP");
      return;
    }
    try {
      setVerifying(true);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("Successfully signed in with OTP");
      const tokenn = auth?.currentUser?.accessToken;
      const userId = auth?.currentUser?.uid;

      let endpoint = action === "login" ? login : signup;
      const response = await axios.post(
        endpoint,
        {
          ...formikValues,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      logIn(); ////
      console.log("LOGIN RESPPP", response.data.user);
      const localToken = response.data.token;
      localStorage.setItem("localtoken", localToken);
      console.log("intial token", localStorage.getItem("localtoken"));
      router.push("/");
    } catch (error: any) {
      setVerifying(false);
      console.error("Error signing in with OTP:", error);
      if (error.code === "auth/invalid-verification-code") {
        setErrorMessage("Invalid OTP. Please try again.");
      } else if (error.response) {
        const errorMsg =
          typeof error.response.data === "string"
            ? error.response.data.error
            : JSON.stringify(error.response.data.error);
        setErrorMessage(errorMsg);
        console.error("Backend error data will show:", error.response.data);
        console.error("Backend error status:", error.response.status);
        console.error("Backend error headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
      // }
    }
  };
  useEffect(() => {
    setUpRecaptcha();
  }, []);

  const handleCombinedClick2 = (e: any) => {
    if (e.key === "Enter") {
      handleCombinedClick();
    }
  };
  const handleCombinedClick = () => {
    if (isRegisterPage) {
      onVerify("signup");
      onSubmit(formikValues);
    } else {
      onVerify("login");
    }
  };
  const handleLoginSubmit = () => {
    if (isRegisterPage) {
      onSubmit(formikValues);
      onSendOtp();
    }
    onSendOtp();
  };

  return (
    <div className="otpVerification">
      {isOtpSent ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h1 className="text-center text-xl font-normal mb-2">
            Enter Verification Code
          </h1>
          <div
            className="flex justify-center items-center mb-6"
            onKeyDown={handleCombinedClick2}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="mx-2">-</span>}
              renderInput={(props) => (
                <input {...props} placeholder="0" className="otpInput" />
              )}
            />
          </div>
          <button
            className="w-full bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white py-2 rounded-lg font-medium hover:bg-[#e26178] transition duration-300"
            onClick={handleCombinedClick}
          >
            {verifying ? (
              <>
                <Preloader />
                {/* Verifying OTP... */}
                {/* <span>Verifying OTP</span>
                <CgSpinner size={20} className="animate-spin"/> */}
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
          {errorMessage && (
            <p className="text-center text-red-500 mt-3">{errorMessage}</p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <button
            tabIndex={0}
            onKeyDown={(event) => {
              console.log("target key", event.key);
              if (event.key === "Enter") {
                event.preventDefault();
                handleLoginSubmit();
              }
            }}
            className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] p-3 w-full rounded-lg text-white font-medium flex items-center justify-center mb-4"
            // className="button-main"
            onClick={handleLoginSubmit}
          >
            {loading ? (
              <>
                <div className="flex ">
                  {/* <span>Sending OTP</span> */}
                  {/* <CgSpinner size={20} className="animate-spin" /> */}
                  <Preloader />
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <span>Send OTP</span>
              </div>
            )}
          </button>

          {/* {firebaseError && <p className="text-red-500 w-64 ">{firebaseError}</p>} */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpVerification;
