export const sanitizePinName = (name: string): string =>
  name.replace(/[^a-zA-Z0-9]/g, "");
