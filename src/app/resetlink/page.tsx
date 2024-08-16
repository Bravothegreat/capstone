
"use client";
import Link from "next/link";


const ResetLinkPage = () => {
  return (
    <div className="h-screen w-screen flex items-center px-8 py-4">
        
      <div className=" sm:mx-auto relative h-screen flex flex-col items-center justify-center gap-5 py-5">
        {/*Tot-left back Icon... */}
        <Link href="/resetpassword">
         
        </Link>
        
        <h4 className="text-[39px] font-medium text-deep-purple">
          Reset Link Sent
        </h4>
        <p className="font-normal text-xs md:text-sm text-dark-gray md:w-[460px] text-center">
          Thank you for submitting your email address to reset your password.
          Your email has been successfully verified, and a password reset link
          has been sent to the email address associated with your account.
        </p>

        {/*Link back to home page */}
        <Link href="/signin" className="font-normal text-base text-bright-teal">
        <p className='flex items-center justify-center w-full mt-5 gap-2 text-bright-teal'> Back to login</p>
        </Link>
      </div>
    </div>
  );
};

export default ResetLinkPage;
