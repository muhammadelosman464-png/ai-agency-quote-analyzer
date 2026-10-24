"use client";

import { useState, useTransition, useRef } from "react";
import { submitProject } from "./actions/submitProject";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitProject(formData);

      if (result.success) {
        setSuccessMessage("تم إرسال طلبك بنجاح!");
        formRef.current?.reset();
      } else if (result.error) {
        setErrorMessage(result.error);
      }
    });
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: "#1e2329" }}
    >
      <div className="w-full max-w-lg">
        {/* Card Container */}
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700/60"
          style={{ backgroundColor: "#252a31" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              وكالة الذكاء الرقمية
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              قم بإدخال بياناتك لتحليل فكرتك فوراً
            </p>
          </div>

          {/* Feedback: Green Success Alert */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Feedback: Red Error Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Field 1: الاسم الكريم */}
            <div>
              <label
                htmlFor="client_name"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                الاسم الكريم
              </label>
              <input
                id="client_name"
                name="client_name"
                type="text"
                required
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-3 rounded-xl bg-[#1e2329] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
              />
            </div>

            {/* Field 2: رقم الهاتف (للتواصل) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                رقم الهاتف (للتواصل)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                required
                placeholder="+966 5X XXX XXXX"
                className="w-full px-4 py-3 rounded-xl bg-[#1e2329] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm text-left"
              />
            </div>

            {/* Field 3: اشرح فكرة مشروعك باختصار */}
            <div>
              <label
                htmlFor="project_idea"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                اشرح فكرة مشروعك باختصار
              </label>
              <textarea
                id="project_idea"
                name="project_idea"
                rows={4}
                required
                placeholder="تحدث عن طبيعة فكرة مشروعك، الأهداف، وأي متطلبات..."
                className="w-full px-4 py-3 rounded-xl bg-[#1e2329] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <span>اطلب تسعيرة الآن</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
