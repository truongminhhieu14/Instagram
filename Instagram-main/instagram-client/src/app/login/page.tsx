import Footer from "@/components/Footer";
import { LoginForm } from "@/components/Form";
import Image from "next/image";
import Link from "next/link";

export default function loginPage() {
  return (
    <div className="bg-primary-bg py-10 mx-auto inline-block w-full">
      <div className="flex justify-center min-w-[500px] mb-8">
        <div className="bg-no-repeat bg-cover bg-bg-login w-[350px] min-h-[500px] relative">
          <Image
            src="/login/login1.png"
            alt="image-login"
            className="object-cover absolute top-5 right-0"
            width="220"
            height="450"
          />
        </div>
        {/* <ImageShowLogin /> */}
        <div className="h-auto ml-4 w-[350px]">
          <LoginForm className="border rounded py-4 mb-4" />
          <div className="mx-auto py-4 mb-4 border rounded text-xs flex justify-center leading-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600">
              Sign up
            </Link>
          </div>
          <div className="text-xs w-[350px]">
            <p className="mb-3 text-center">Get the app.</p>
            <div className="flex justify-center">
              <Image
                src="/login/microsoft.png"
                alt="microsoft"
                width={130}
                height={40}
                className=""
              />
              <Image
                src="/login/ggplay.png"
                alt="microsoft"
                width={130}
                height={40}
                className="ml-2"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
