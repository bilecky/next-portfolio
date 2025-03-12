"use client";
import React, { useEffect, useState } from "react";
import { RiMailSendFill } from "react-icons/ri";
import { set, useForm } from "react-hook-form";
import { sendEmail } from "@/app/lib/mailer";
import clsx from "clsx";
import { PropagateLoader } from "react-spinners";
import { useTranslations } from "next-intl";

export type contactFormData = {
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
    clearErrors,
    reset,
  } = useForm<contactFormData>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formMessage, setFormMessage] = useState<StatusObject | null>(null);

  const tErrors = useTranslations("FormErrors");

  const tPlaceholders = useTranslations("FormPlaceholders");

  useEffect(() => {
    if (!formMessage) return;

    const timeoutId = setTimeout(() => {
      setFormMessage(null);
      clearErrors();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [formMessage]);

  async function onSubmit(data: contactFormData) {
    setIsLoading(true);
    setFormMessage(null);

    try {
      const emailResponse = await sendEmail(data);

      if (emailResponse.success) {
        setFormMessage({
          status: "success",
          message: tErrors("successMessage"),
        });
        reset();
      } else {
        setFormMessage({
          status: "error",
          message: tErrors(emailResponse.error),
        });
      }
    } catch (error) {
      setFormMessage({
        status: "error",
        message: tErrors("DEFAULT_API_ROUTE_MAILER_ERROR"),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-contactFormPadding relative flex flex-col gap-12 lg:py-0"
    >
      {isLoading && (
        <div className="absolute inset-0 z-[100] flex items-end justify-center">
          <PropagateLoader size={20} color="#212121" />
        </div>
      )}
      <div className="relative w-full">
        <input
          {...register("name", {
            required: tErrors("nameRequired"),
            minLength: {
              value: 2,
              message: tErrors("nameMinLength"),
            },
            maxLength: {
              value: 15,
              message: tErrors("nameMaxLength"),
            },
          })}
          type="text"
          name="name"
          placeholder={tPlaceholders("name")}
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
          {...register("email", { required: tErrors("emailRequired") })}
          type="email"
          name="email"
          placeholder={tPlaceholders("email")}
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
            required: tErrors("messageRequired"),
            minLength: {
              value: 10,
              message: tErrors("messageMinLength"),
            },
            maxLength: {
              value: 500,
              message: tErrors("messageMaxLength"),
            },
          })}
          rows={5}
          name="message"
          placeholder={tPlaceholders("message")}
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
            {tPlaceholders("button")}
          </span>
          <span className="second_text absolute translate-y-[100%] overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-background group-hover:opacity-100">
            {tPlaceholders("button")}
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
