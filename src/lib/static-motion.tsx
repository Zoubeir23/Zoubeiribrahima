import { Fragment, createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileInView",
  "viewport",
  "drag",
  "dragConstraints",
  "dragElastic",
  "layout",
  "layoutId",
  "onAnimationStart",
  "onAnimationComplete",
]);

const stripMotionProps = (props: Record<string, unknown>) => {
  const next: Record<string, unknown> = {};
  for (const key in props) {
    if (!MOTION_PROPS.has(key)) {
      next[key] = props[key];
    }
  }
  return next;
};

const makeStatic = (tag: ElementType) => {
  return (props: ComponentPropsWithoutRef<ElementType>) => {
    const clean = stripMotionProps(props as Record<string, unknown>);
    return createElement(tag, clean);
  };
};

export const motion = new Proxy(
  {},
  {
    get: (_target, prop: string) => makeStatic(prop as ElementType),
  },
) as Record<string, ReturnType<typeof makeStatic>>;

export const AnimatePresence = ({ children }: PropsWithChildren) => <Fragment>{children}</Fragment>;

export const MotionConfig = ({ children }: PropsWithChildren) => <Fragment>{children}</Fragment>;

export const useReducedMotion = () => true;
