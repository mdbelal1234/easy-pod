import type { Variants } from "framer-motion";

/**
 * Shared entrance-animation variants for staggered card/list grids.
 * Apply `staggerContainer` to the parent (single viewport observer) and
 * `fadeInUp` to each child — children inherit the parent's animate state
 * instead of each running their own IntersectionObserver.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function staggerContainer(staggerChildren = 0.06): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren } },
  };
}
