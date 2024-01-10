"use client";
import Image from "next/image";
import Link from "next/link";
import {  useParams } from 'next/navigation';
import HistoryTransaction from "./HistoryTransaction";


function ProfileHeader() {
  const pathParams = useParams()
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className="flex flex-col">
            <div className='relative h-20 w-20 object-cover'>
              <Image
                src={"/solana.svg"}
                alt='logo'
                fill
                className='rounded-full object-contain shadow-2xl'
              />
            </div>
            <p>address : {pathParams.address}</p>
            <HistoryTransaction/>
          </div>
        </div>
      </div>

      {/* <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p> */}

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;