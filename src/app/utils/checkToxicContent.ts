import { TOXIC_WORDS } from '../constants/toxicWords';

export const containsToxicWords = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  return TOXIC_WORDS.filter(word => lowerText.includes(word));
};
