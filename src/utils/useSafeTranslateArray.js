// src/utils/useSafeTranslateArray.js
import { useTranslation } from 'react-i18next';

export default function useSafeTranslateArray(key) {
  const { t, ready } = useTranslation();

  if (!ready) return []; // attend que les traductions soient prêtes

  const value = t(key, { returnObjects: true });
  return Array.isArray(value) ? value : [];
}
