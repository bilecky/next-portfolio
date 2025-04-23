export const sanitizePinName = (name: string): string =>
  name.replace(/[^a-zA-Z0-9]/g, "");

const forbiddenWords = [
  "chuj",
  "dupa",
  "cipa",
  "kutas",
  "kurwa",
  "pierd",
  "skurwiel",
  "skurwysyn",
  "jeb",
  "jeba",
  "jebac",
  "jebana",
  "jebane",
  "jebany",
  "jebiesz",
  "jebieszka",
  "jebieszko",
  "jebieszku",
  "spierdalaj",
  "gówno",
  "dziwka",
  "cham",
  "gnój",
  "frajer",
  "głupek",
  "idiota",
  "kretyn",
  "idiotka",
  "kretynka",
  "świnia",
  "paskudny",
  "plugawy",
  "oszust",
  "łajdak",
  "łachudra",
  "łotr",
  "kanalia",
  "sukinsyn",
  "palant",
  "burak",
  "wał",
  "frajerski",
  "głupi",
  "głupia",
  "głupie",
  "głupkowaty",
  "głupkowata",
  "głupkowate",
  "paskuda",
  "złodziej",
  "złodziejka",
  "gnida",
  "paskudztwo",
  "złamas",
  "złamasica",
  "szmata",
  "szmatławiec",
  "szczyl",
  "szczeka",
  "szczeniak",
  "szczur",
  "szmaciarz",
  "szmaciara",
  "tchórz",
  "tchórzliwy",
  "tchórzliwa",
  "tchórzliwe",
  "frajernia",
  "łachman",
  "łachmanka",
  "łachmaniarz",
  "łachmaniara",
  "matoł",
  "matołek",
  "matołka",
  "matołowaty",
  "matołowata",
  "matołowate",
  "menda",
  "mendzior",
  "niedojda",
  "niedojrzały",
  "niedojrzała",
  "niedojrzałe",
  "nieudacznik",
  "nieudacznica",
  "nieudaczny",
  "nieudaczna",
  "nieudaczne",
  "nieudolny",
  "nieudolna",
];

export const containsForbiddenWords = (text: string): boolean => {
  const lowerCaseText = text.toLowerCase();
  return forbiddenWords.some((forbiddenWord) =>
    lowerCaseText.includes(forbiddenWord.toLowerCase()),
  );
};

export const currentYear = new Date().getFullYear();

export const blockScroll = (boolean: boolean) => {
  if (boolean) {
    document.body.style.overflowY = "hidden";
    document.body.setAttribute("data-lenis-prevent", "true");
  } else {
    document.body.style.overflowY = "auto"; // zmień na overflowY dla spójności
    document.body.removeAttribute("data-lenis-prevent");
  }
};
