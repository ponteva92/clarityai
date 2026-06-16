import { useEffect } from 'react';

interface PageMeta {
  /** Full <title>. A " — ClarityAI" suffix is appended automatically unless it already ends with the brand. */
  title: string;
  /** Meta description (~150–160 chars for ideal SERP display). */
  description?: string;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets a route-specific document title and meta description for SEO and
 * social sharing in this single-page app. Keeps Open Graph / Twitter tags in
 * sync so each crawled route surfaces its own snippet.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const fullTitle = title.includes('ClarityAI') ? title : `${title} — ClarityAI`;
    const previous = document.title;
    document.title = fullTitle;
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('name', 'twitter:title', fullTitle);

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    return () => {
      document.title = previous;
    };
  }, [title, description]);
}
