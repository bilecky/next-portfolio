export type Project = {
  id: number;
  title: string;
  description: string;
  imagesSrc: string[];
  technologiesUsed: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "WorkFlow Pro",
    description:
      "A modern, fully responsive portfolio website designed to showcase projects using cutting-edge technologies. The site integrates smooth animations, dynamic content loading, and an intuitive interface that adapts seamlessly to various screen sizes. The applied design system ensures a cohesive aesthetic while maintaining optimal performance. The portfolio uses advanced component rendering techniques and application state management, resulting in lightning-fast loading times even with complex visual elements. Its modular architecture allows for easy expansion of functionality in the future.",
    imagesSrc: [
      "/projectsScreenshots/project1/image-1.png",
      "/projectsScreenshots/project1/image-2.png",
      "/projectsScreenshots/project1/image-3.png",
      "/projectsScreenshots/project1/image-4.png",
      "/projectsScreenshots/project1/image-5.png",
    ],
    technologiesUsed: [
      "React.js",
      "Next.js",
      "Sass",
      "Framer Motion",
      "Redux",
      "Jest",
      "Webpack",
    ],
  },
  {
    id: 2,
    title: "TM Plugin",
    description:
      "An advanced 3D visualization platform utilizing Three.js and React to create immersive and interactive experiences. The application employs efficient rendering techniques and optimized animation sequences, ensuring smooth interactions even with complex 3D models. The implementation of TypeScript provides type safety and enhances code reliability. The project offers the ability to explore complex visual environments, including advanced lighting effects, texturing, and object shading. The camera management system enables smooth transitions between different perspectives, while optimized computational algorithms guarantee high performance even on mobile devices.",
    imagesSrc: [
      "/projectsScreenshots/project2/image-1.png",
      "/projectsScreenshots/project2/image-2.png",
      "/projectsScreenshots/project2/image-3.png",
      "/projectsScreenshots/project2/image-4.png",
      "/projectsScreenshots/project2/image-5.png",
    ],
    technologiesUsed: [
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "React-Three-Fiber",
      "Drei",
    ],
  },
  {
    id: 3,
    title: "Hubra.com.pl",
    description:
      "A dynamic web application offering configurable dashboards and real-time data visualization, providing users with an interactive way to analyze and interpret complex datasets. The project combines advanced frontend frameworks with high-performance animation libraries, creating a fluid and engaging user experience. The implementation of advanced charts and diagrams enables instant understanding of trends and patterns in data. The filtering and sorting system allows for quick adaptation of the view to specific analytical needs. The application also offers the ability to export data in various formats and create automated reports sent according to a predetermined schedule.",
    imagesSrc: [
      "/projectsScreenshots/project3/image-1.png",
      "/projectsScreenshots/project3/image-2.png",
      "/projectsScreenshots/project3/image-3.png",
      "/projectsScreenshots/project3/image-4.png",
      "/projectsScreenshots/project3/image-5.png",
    ],
    technologiesUsed: [
      "Next.js",
      "Sass",
      "Framer Motion",
      "D3.js",
      "Chart.js",
      "Redux",
      "Firebase",
    ],
  },
  {
    id: 4,
    title: "DevHireNet",
    description:
      "A high-performance e-commerce platform built with Vue, featuring advanced filtering options and smooth product transitions. The application implements responsive design using Tailwind CSS and leverages GSAP animations for fluid user interactions. The integration with Nuxt.js enhances SEO capabilities through server-side rendering, optimizing the platform's visibility in search results. The shopping cart system allows for preserving its contents even after closing the browser, and the payment module integrates with popular payment gateways. The platform also offers a product recommendation system based on the user's browsing and purchase history, increasing conversion rates and order values.",
    imagesSrc: [
      "/projectsScreenshots/project4/image-1.png",
      "/projectsScreenshots/project4/image-2.png",
      "/projectsScreenshots/project4/image-3.png",
      "/projectsScreenshots/project4/image-4.png",
      "/projectsScreenshots/project4/image-5.png",
    ],
    technologiesUsed: [
      "Vue.js",
      "Nuxt.js",
      "Tailwind CSS",
      "GSAP",
      "Pinia",
      "Axios",
      "Vitest",
    ],
  },
  {
    id: 5,
    title: "pawelbilski.com",
    description:
      "A feature-rich full-stack application that seamlessly integrates a Django backend with a modern frontend stack. This project exemplifies robust API development and responsive UI design, incorporating RESTful endpoints, user authentication, real-time data visualization, and notification systems. The permission management system enables precise control of access to application features depending on the user's role. Advanced caching and database query optimization ensure short response times even under heavy load. The application offers an extensive API for external developers and comprehensive documentation, enabling easy expansion of functionality by development teams.",
    imagesSrc: [
      "/projectsScreenshots/project5/image-1.png",
      "/projectsScreenshots/project5/image-2.png",
      "/projectsScreenshots/project5/image-3.png",
      "/projectsScreenshots/project5/image-4.png",
      "/projectsScreenshots/project5/image-5.png",
    ],
    technologiesUsed: [
      "Django",
      "Python",
      "PostgreSQL",
      "React",
      "Redux",
      "Material UI",
      "Docker",
      "Nginx",
    ],
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
  "D3.js",
  "Chart.js",
];
