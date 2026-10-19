import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delaySeconds?: number;
}

const VISIBILITY_THRESHOLD = 0.1;

const shouldShowImmediately = (): boolean =>
  typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Reveal = ({ children, as: Element = "div", className = "", delaySeconds = 0 }: RevealProps) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(shouldShowImmediately);

  useEffect(() => {
    const element = elementRef.current;
    if (isVisible || !element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: VISIBILITY_THRESHOLD },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  const style = { "--reveal-delay": `${delaySeconds}s` } as CSSProperties;

  return (
    <Element
      ref={elementRef}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Element>
  );
};

export default Reveal;
