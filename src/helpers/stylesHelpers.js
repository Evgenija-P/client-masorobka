export const titleAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.4, duration: 0.5 },
  }),
};

export const blocAnimation = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: (custom) => ({ scale: 1, opacity: 1, transition: { delay: custom * 0.3, duration: 0.3 } }),
};
