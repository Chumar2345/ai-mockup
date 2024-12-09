// "use client"
// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// export const Header = () => {
//     const path=usePathname()
//     useEffect(()=>{
//         console.log(path);
//     })
//   return (
//     <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
//         <Image src={'/logo.svg'} alt='logo' width={160} height={100}  style={{ width: "auto", height: "auto" }}   />
//         <ul className='hidden md:flex gap-6'>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How its works?</li>
//         </ul>
//         <UserButton/>
//     </div>
//   )
// }
"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={160}
        height={100}
        style={{ width: "auto", height: "auto" }}
      />
      <ul className="hidden md:flex gap-6">
        <li>
          <Link href="/dashboard">
            <span
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard" && "text-primary font-bold"
              }`}
            >
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/upgrade">
            <span
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard/upgrade" && "text-primary font-bold"
              }`}
            >
              Upgrade
            </span>
          </Link>
        </li>
        
        <li>
          <Link href="/dashboard/works">
            <span
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === "/dashboard/works" && "text-primary font-bold"
              }`}
            >
              How it works?
            </span>
          </Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

