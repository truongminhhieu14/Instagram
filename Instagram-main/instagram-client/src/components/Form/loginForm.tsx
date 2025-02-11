"use client";

import FacebookIcon from "@/Icon";
import { AuthApi } from "@/app/_api/auth.api";
import { ILoginForm, loginFormSchema } from "@/app/_type/loginType";
import { setRefreshToken, setToken, setUser } from "@/service/storage.service";
import HttpStatusCode from "@/util/constant/HttpCode.enum";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormProps = {
  className: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: joiResolver(loginFormSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: ILoginForm) => {
      return await AuthApi.login(data);
    },
  });

  const onSubmit = (data: ILoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.statusCode === HttpStatusCode.Ok) {
          setUser(response.data.user);
          setRefreshToken(response.data.refreshToken);
          setToken(response.data.accessToken);
          window.location.href = "/";
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div className={className}>
      <div className="flex justify-center py-4">
        <Image
          src="/login/instagram-text.png"
          alt="loginform"
          width={175}
          height={51}
          className="flex justify-center"
        />
      </div>
      <form className="text-center mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <input
            {...register("email")}
            className="p-2 border rounded bg-slate-50 w-[280px] text-xs"
            placeholder="Username or email"
          />

          <p className="text-xs text-start text-red-600 h-5 my-1 w-[280px]">
            {errors.email && errors.email.message}
          </p>
          <input
            {...register("password")}
            className="p-2 border rounded bg-slate-50 w-[280px] text-xs"
            placeholder="Password"
            type="password"
          />

          <p className="text-xs text-start text-red-600 h-5 my-1 w-[280px]">
            {errors.password && errors.password.message}
          </p>
        </div>
        <button
          type="submit"
          className=" text-sm border rounded-lg bg-blue-500 font-bold w-[280px] text-white py-2 text-center hover:opacity-80"
        >
          Log in
        </button>
      </form>

      <div className="flex items-center mx-auto text-xs text-gray-500 w-[280px] mb-6">
        <div className="border-b border-gray-500 h-[1px] w-full"></div>
        <div className="text-center mx-3">OR</div>
        <div className="border-b border-gray-500 h-[1px] w-full"></div>
      </div>

      <div className="flex justify-center items-center mb-4">
        <FacebookIcon className="h-5 w-5 mr-2" />
        <Link href="/login" className="text-xs text-blue-600">
          Log in with facebook
        </Link>
      </div>

      <Link
        href="/"
        className="text-blue-400 text-xs justify-center ml-7 flex cursor-pointer"
      >
        Forgot password?
      </Link>
    </div>
  );
}
