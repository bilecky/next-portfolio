"use client";
import React, { useState } from "react";
import { RiMailSendFill } from "react-icons/ri";
import { set, useForm } from "react-hook-form";
import { sendEmail } from "@/app/lib/mailer";
import clsx from "clsx";
import { PropagateLoader } from "react-spinners";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

type StatusObject = {
  status: string;
  message: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<StatusObject | null>(null);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    setFormMessage(null);

    try {
      await sendEmail(data);
      setFormMessage({
        status: "success",
        message: "Wiadomość została wysłana",
      });
    } catch (error) {
      if (error instanceof Error) {
        setFormMessage({ status: "error", message: error.message });
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setFormMessage(null);
      }, 5000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-12"
    >
      {isLoading && (
        <div className="absolute inset-0 z-[100] flex items-end justify-center">
          <PropagateLoader size={20} color="#212121" />
        </div>
      )}
      <div className="relative w-full">
        <input
          {...register("name", {
            required: "Imię jest wymagane",
            minLength: {
              value: 2,
              message: "Imię musi mieć co najmniej 2 znaki",
            },
            maxLength: {
              value: 15,
              message: "Imię może mieć maksymalnie 15 znaków",
            },
          })}
          type="text"
          name="name"
          placeholder="Name"
          className={clsx(
            "contact_input w-full border-b-2 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none",
            {
              "border-b-red-500 focus:border-b-red-500": errors.name,
            },
          )}
        />
        {errors.name && (
          <p className="absolute -bottom-8 left-0 text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="relative w-full">
        <input
          {...register("email", { required: "Email jest wymagany" })}
          type="email"
          name="email"
          placeholder="Email"
          className={clsx(
            "contact_input w-full border-b-2 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none",
            {
              "border-b-red-500 focus:border-b-red-500": errors.email,
            },
          )}
        />
        {errors.email && (
          <p className="absolute -bottom-8 left-0 text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="relative w-full">
        <textarea
          {...register("message", {
            required: "Wiadomość jest wymagana",
            minLength: {
              value: 10,
              message: "Wiadomość musi mieć co najmniej 10 znaków",
            },
            maxLength: {
              value: 500,
              message: "Wiadomość może mieć maksymalnie 500 znaków",
            },
          })}
          rows={5}
          name="message"
          placeholder="Message"
          className={clsx(
            "contact_input w-full border-b-2 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none",
            {
              "border-b-red-500 focus:border-b-red-500": errors.message,
            },
          )}
        ></textarea>
        {errors.message && (
          <p className="absolute -bottom-8 left-0 text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="btn_wrapper inline-block">
        <button
          type="submit"
          className={clsx(
            "group inline-flex w-auto cursor-pointer items-center overflow-hidden rounded-sm border-2 border-background bg-background px-6 py-4 leading-none text-mainFontColor transition-all duration-300 hover:bg-mainFontColor hover:text-background",
            {
              "cursor-not-allowed opacity-50": isLoading,
            },
          )}
        >
          <span className="first_text overflow-hidden transition-all duration-300 group-hover:translate-y-[-100%] group-hover:text-mainFontColor group-hover:opacity-0">
            submit
          </span>
          <span className="second_text absolute translate-y-[100%] overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-background group-hover:opacity-100">
            submit
          </span>
          <RiMailSendFill className="ml-3" />
        </button>
        {formMessage?.status === "success" && (
          <span className="ml-4 text-green-600">{formMessage.message}</span>
        )}
        {formMessage?.status === "error" && (
          <span className="ml-4 text-red-500">{formMessage.message}</span>
        )}
      </div>
    </form>
  );
};

export default Form;
