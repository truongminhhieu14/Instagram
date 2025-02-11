"use client";
import { AuthApi } from "@/app/_api/auth.api";
import { IRegisterForm, registerFormSchema } from "@/app/_type/registerType";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { toastify } from "../common/toastify/Toastify";
import "react-toastify/dist/ReactToastify.css";

import HttpStatusCode from "@/util/constant/HttpCode.enum";
import { useMutation } from "@tanstack/react-query";

type Props = {
  className?: string;
};

export default function RegisterForm({ className }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: joiResolver(registerFormSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: Omit<IRegisterForm, "passwordConfirmation">) => await AuthApi.register(data),
  })

  const onSubmit = async (data: IRegisterForm) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.statusCode === HttpStatusCode.Created)
          toastify({
            type: "success",
            msg: `${response.message}, we will direct to login page after few seconds`,
            onClose: () => (window.location.href = "/login"),
          });
      }
    })
  };
  
  return (
    <div className={className}>
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <input
            {...register("email")}
            placeholder="Email"
            className="p-2 border rounded bg-slate-50  w-[280px] text-sm"
          />
          <p className="text-xs text-start text-red-600 h-5 my-1 w-[280px]">
            {errors.email && errors.email.message}
          </p>
          <input
            placeholder="Username"
            {...register("username")}
            className="p-2 border rounded bg-slate-50 w-[280px] text-sm"
          />
          <p className="text-xs text-start text-red-600 h-5 my-1 w-[280px]">
            {errors.username && errors.username.message}
          </p>
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
            className="p-2 border rounded bg-slate-50 w-[280px] text-sm"
          />
          <p className="text-xs text-start text-red-600 h-5 my-1 w-[280px]">
            {errors.password && errors.password.message}
          </p>
          <input
            placeholder="Confirm password"
            type="password"
            {...register("passwordConfirmation")}
            className="p-2 border rounded bg-slate-50 w-[280px] text-sm"
          />
          <p className="text-xs text-start text-red-600 h-5 my-1 w-[280px]">
            {errors.passwordConfirmation && errors.passwordConfirmation.message}
          </p>
        </div>
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="my-4 text-sm border rounded-lg bg-blue-500 font-bold w-[280px] text-white py-2 text-center hover:opacity-80"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
