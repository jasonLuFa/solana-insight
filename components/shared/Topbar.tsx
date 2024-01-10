import Link from "next/link";
import Image from "next/image";


function Topbar(){
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/solana.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold">Solana Insight</p>
      </Link>
    </nav>    
  )
}
export default Topbar