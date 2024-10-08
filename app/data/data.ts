export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologiesUsed: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Project Onish",
    description:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    image: "/project-0.png",
    technologiesUsed: ["React", "Next.js", "Sass", "Framer Motion"],
  },
  {
    id: 2,
    title: "Project trulis",
    description:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    image: "/project-1.png",
    technologiesUsed: [
      "React",
      "Next.js",
      "Tailwind",
      "Typescript",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "React-Three-Fiber",
      "Drei",
    ],
  },
  {
    id: 3,
    title: "Projecant",
    description:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    image: "/project-2.png",
    technologiesUsed: ["Next.js", "Sass", "Framer Motion", "Three.js"],
  },
  {
    id: 4,
    title: "Project onish",
    description:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    image: "/project-3.png",
    technologiesUsed: ["Vue.js", "Nuxt.js", "Tailwind", "GSAP"],
  },
  {
    id: 5,
    title: "Projectonicus",
    description:
      "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    image: "/project-4.png",
    technologiesUsed: ["Django", "Python", "PostgreSQL", "Nginx"],
  },
];

export const technologies: string[] = [
  "Next.js",
  "TailwindCSS",
  "GSAP",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Redux",
  "React Router",
  "Material UI",
  "Ember.js",
  "Angular",
  "Vue.js",
  "Sass",
  "Less",
  "PostCSS",
  "Webpack",
  "Babel",
];
