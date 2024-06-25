"use client"
import React from 'react'
import Image from "next/image"
const loading = () => {
  return (
    <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
  )
}

export default loading