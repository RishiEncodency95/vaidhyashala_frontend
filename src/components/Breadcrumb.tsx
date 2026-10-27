import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  homeLabel?: string;
  homeHref?: string;
  currentLabel?: string;
}

export default function Breadcrumb({
  homeLabel = "Home",
  homeHref = "/home",
  currentLabel = "Health Journal",
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-[12.5px] font-normal">
        <li>
          <Link
            href={homeHref || "/home"}
            className="text-[#A58351] transition-colors hover:text-[#123E30]"
          >
            {homeLabel}
          </Link>
        </li>
        <li className="text-[#9FA9A2]">/</li>
        <li className="text-[#62645F] font-normal" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
