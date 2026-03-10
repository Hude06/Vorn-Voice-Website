import { DashboardView } from "@/components/dashboard/dashboard-view";
import { getDownloadMetadataUrl, resolveDownloadUrl } from "@/lib/download-source";
import { getDashboardMetrics } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const metrics = getDashboardMetrics();
  const currentTarget = await getCurrentTarget();

  return (
    <DashboardView
      initialMetrics={metrics}
      currentTarget={currentTarget.value}
      currentTargetError={currentTarget.error}
    />
  );
}

async function getCurrentTarget() {
  try {
    return {
      value: await resolveDownloadUrl(),
      error: null,
    };
  } catch (error) {
    console.error("Failed to resolve current download target", error);

    return {
      value: null,
      error: `Using metadata source ${getDownloadMetadataUrl()} until the live target resolves again.`,
    };
  }
}
