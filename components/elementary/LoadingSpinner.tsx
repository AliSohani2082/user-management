"use client";

import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoadingSpinner() {
  const t = useTranslations("common");

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">{t("loading")}</p>
      </div>
    </div>
  );
}
