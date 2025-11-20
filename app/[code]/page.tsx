// app/[code]/page.tsx
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ code: string }>;
}

interface Link {
  code: string;
  url: string;
  clicks: number;
  last_clicked: Date | null;
}

export default async function RedirectPage(props: PageProps) {
  const { code } = await props.params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return <div>Not Found</div>;
  }

  await prisma.link.update({
    where: { code },
    data: { 
      clicks: link.clicks + 1,
      last_clicked: new Date(),
    },
  });

  redirect(link.url);
}
