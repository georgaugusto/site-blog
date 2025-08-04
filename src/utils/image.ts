/**
 * Converte um srcSet do Next.js Image para uma URL CSS background-image
 *
 * @param srcSet - String srcSet retornada por getImageProps do Next.js
 * @returns String CSS url() para usar em background-image
 *
 * @example
 * ```typescript
 * const { props: { srcSet } } = getImageProps({
 *   src: '/image.jpg',
 *   width: 1920,
 *   height: 1080
 * });
 *
 * const backgroundImage = getBackgroundImage(srcSet);
 * // Retorna: 'url("/_next/image?url=%2Fimage.jpg&w=1920&q=75")'
 * ```
 */
export function getBackgroundImage(srcSet = ""): string {
  if (!srcSet) return "none";

  // Pega a URL da maior resolução (última no srcSet)
  const urls = srcSet.split(", ");
  const lastUrl = urls[urls.length - 1];
  const [url] = lastUrl.split(" ");

  return `url("${url}")`;
}
