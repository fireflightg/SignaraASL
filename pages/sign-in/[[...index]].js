import { NavbarDemo } from "@/components/sidebaruser"
import { SignIn } from  "@clerk/clerk-react"


export default function Page() {
  return(
    <>

  <div className=" overflow-hidden overscroll-none grid  md:grid-cols-3  w-full h-full relative top-3 mt-52  flex-col gap-4 items-center justify-center   text-center  "> <span></span> <SignIn path="/sign-in" routing="path" className="  w-full h-full relative flex flex-col gap-4 text-center items-center justify-center " /> <span></span></div>
</>)
}