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
