import Footer from "@/components/Footer";
import { RegisterForm } from "@/components/Form";
import Image from "next/image";
import Link from "next/link";

export default function registerPage() {
  return (
    <div className="bg-primary-bg py-12 mx-auto inline-block w-full">
      <div className="flex justify-center">
        <div>
          <div className="w-[350px] border rounded">
            <div className="flex justify-center py-4 mb-8">
              <Image
                src="/login/instagram-text.png"
                alt="loginform"
                width={175}
                height={51}
                className="flex justify-center"
              />
            </div>
            <div className="text-center mx-6 mb-4">
              <p className="text-md text-slate-500">
                Sign up to see photos and videos from your friends.
              </p>
            </div>
            <RegisterForm />
            <div className="w-[280px] mx-auto text-center">
              <p className="text-xs text-slate-400 mb-4">
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </p>

              <p className="text-xs text-slate-400 mb-4">
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy.
              </p>
            </div>
          </div>
          <div className="border rounded flex justify-center py-8 w-[350px] my-4">
            <p className="text-sm">
              Have an account?{" "}
              <Link className="text-blue-400" href="/login">
                Log in
              </Link>
            </p>
          </div>
          <div className="h-auto ml-4 w-[350px] mb-5">
            <div className="text-xs w-[350px]">
              <p className="mb-3 text-center mr-7">Get the app.</p>
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
      </div>
      <Footer />
    </div>
  );
}
