"use client";

import { useSearchParams } from "next/navigation";
import ReviewDetails from "@/components/careers/review-details/ReviewDetails";

export default function ReviewDetailsPage() {
  const searchParams = useSearchParams();
  const roleTitle = searchParams.get("role") || searchParams.get("jobTitle") || "Ayurvedic Doctor";
  const fileName = searchParams.get("fileName") || "Resume.pdf";
  const fileSize = searchParams.get("fileSize") || "2.4 MB";

  return <ReviewDetails roleTitle={roleTitle} fileName={fileName} fileSize={fileSize} />;
}
