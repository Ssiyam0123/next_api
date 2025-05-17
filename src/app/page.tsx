"use client"
import Image from "next/image";

export default function Home() {
  const handleApi = async()=>{
const a = await fetch('/api/user')
console.log(await a.json())
  }
  return (
    <div>
      <button onClick={handleApi}>click me</button>
    </div>
  );
}
