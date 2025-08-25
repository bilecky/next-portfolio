export const gsap = {
  registerPlugin: jest.fn(),
  set: jest.fn(),
  context: (cb) => {
    cb(); // wykonaj callback
    return {
      revert: jest.fn(), // useGSAP oczekuje, że zwróci obiekt z revert()
    };
  },
};

export const ScrollTrigger = {
  create: jest.fn(),
};
