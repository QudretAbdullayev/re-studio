/**
 * Utility function to merge classNames similar to clsx
 * @param {...(string | undefined | null | false)} inputs - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return inputs
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
