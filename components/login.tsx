"use client";
import { Suspense, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";

interface Props {
  className?: string;
}

const Login = (props: Props) => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isVisible, setIsVisible] = useState(false);
  const userName = useRef("");
  const password = useRef("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      username: userName.current,
      password: password.current,
      redirect: true,
      callbackUrl: process.env.NEXTAUTH_URL + "/admin",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="w-screen h-screen bg-sectionOne bg-cover bg-repeat min-h-scree">
        <div className="flex justify-center">
          <div className="flex mt-20 pb-10 flex-col w-full mx-1  rounded-lg md:w-4/12">
            <div className="flex justify-end">
              <div className="mt-2 mr-2 cursor-pointer">
                <ThemeSwitch />
              </div>
            </div>
            <div className="flex justify-center mx-3">
              <div className="flex-col justify-center md:w-10/12 w-full">
                <h1 className="text-xl text-center text-default-100 font-bold mt-5">
                  Selamat Datang
                </h1>
                <h1 className="text-[50px] text-center font-bold mt-5 text-default-200">
                  <span className="text-gray-500 bg-primary-500 px-2">FH</span>
                  FinHydroPro
                </h1>
                {!!error && (
                  <p className="text-danger-500 bg-danger-100 text-red-500 text-center p-2">
                    Authentication Failed
                  </p>
                )}
                <div className="flex-col mt-2 space-y-2">
                  <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <Input
                      label="Email"
                      type="email"
                      onChange={(e) => (userName.current = e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap md:flex-nowrap gap-4 shadow-lg">
                    <Input
                      endContent={
                        <button
                          className=""
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Password"
                      onChange={(e) => (password.current = e.target.value)}
                      type={isVisible ? "text" : "password"}
                    />
                  </div>

                  <div className="flex justify-center gap-2">
                    <Button className="bg-primary-foreground" type="submit">
                      Login
                    </Button>
                    {/* <Button className="bg-primary-foreground">
                      Registrasi
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const SuspenseLogin = (props: Props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Login {...props} />
  </Suspense>
);

export default SuspenseLogin;
