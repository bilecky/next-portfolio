import { projects } from "@/data/data";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next/types";

type ProjectLayoutProps = {
  params: {
    id: number;
  };
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: ProjectLayoutProps): Promise<Metadata> {
  const paramsProjectId = params.id;
  const tProjectPage = await getTranslations("SingleProjectPage");
  const tNotFound = await getTranslations("404");

  if (!projects[paramsProjectId - 1] || isNaN(paramsProjectId)) {
    return {
      title: "404 - Paweł Bilski",
      description: tNotFound("ProjectNotFound"),
    };
  }
  return {
    title:
      tProjectPage(`projects.${paramsProjectId}.title`) + " - Paweł Bilski",
    description:
      tProjectPage(`projects.${paramsProjectId}.description`).substring(
        0,
        157,
      ) + "...",
  };
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  // This is a simple wrapper that just renders the children
  return children;
}
