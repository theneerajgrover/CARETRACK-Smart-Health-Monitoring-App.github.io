import type { Variants } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: { duration: 0.28, ease },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease },
  },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
}

export const cardHover = {
  rest: { y: 0, scale: 1, borderColor: 'rgba(228,228,231,1)' },
  hover: {
    y: -4,
    scale: 1.01,
    borderColor: 'rgba(67,56,202,0.35)',
    transition: { type: 'spring', stiffness: 380, damping: 28 },
  },
}

export const symptomSelect: Variants = {
  unselected: { scale: 1, backgroundColor: 'rgba(255,255,255,1)' },
  selected: {
    scale: [1, 1.04, 1],
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

export const checkMark: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 28 },
  },
}

export const mobileMenu: Variants = {
  closed: { x: '100%' },
  open: {
    x: 0,
    transition: { duration: 0.45, ease },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.38, ease },
  },
}

export const mobileMenuBackdrop: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export const mobileNavItem: Variants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.4, ease },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 16,
    transition: { delay: i * 0.03, duration: 0.25 },
  }),
}

export const buttonTap = { scale: 0.96 }
export const buttonHover = { scale: 1.03 }

export const shakeX: Variants = {
  idle: { x: 0 },
  shake: {
    x: [0, -4, 4, -3, 3, -2, 2, 0],
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
}

export const glowPulse = {
  animate: {
    opacity: [0.5, 0.82, 0.5],
    scale: [0.97, 1.04, 0.97],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}
