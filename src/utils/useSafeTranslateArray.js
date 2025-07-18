// src/utils/useSafeTranslateArray.js
import { useTranslation } from "react-i18next";

export default function useSafeTranslateArray(key) {
  const { t } = useTranslation();
  const result = t(key, { returnObjects: true });
  return Array.isArray(result) ? result : [];
}
