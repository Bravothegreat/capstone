"use client";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div>WELCOME TO SCISSORS</div>
      <div className="authenticate">
        <p>
          {" "}
          <Link href="/signup">Sign Up</Link>
        </p>

        <p>
          {" "}
          <Link href="/signin">Sign In</Link>
        </p>
      </div>
    </>
  );
}
