import { prisma } from "@/lib/db";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function StatsPage(props: PageProps) {
  const { code } = await props.params;

  console.log("📊 [StatsPage] Loading stats for:", code);

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    console.log("❌ StatsPage: Link not found:", code);
    return <h1>404 - Not Found</h1>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Stats for {link.code}</h1>

      <p><b>URL:</b> {link.url}</p>
      <p><b>Total Clicks:</b> {link.clicks}</p>
      <p><b>Last Click:</b> {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "Never"}</p>
      <p><b>Created At:</b> {new Date(link.created_at).toLocaleString()}</p>
    </div>
  );
}
