"use client";

import EligibleResult from "@/components/careers/screening-result/EligibleResult";
import PartialMatchResult from "@/components/careers/screening-result/PartialMatchResult";
import NotEligibleResult from "@/components/careers/screening-result/NotEligibleResult";
import ScreeningResultLoader from "@/components/careers/screening-result/ScreeningResultLoader";
import type { Verdict } from "@/lib/careers/screening";

const RESULT_BY_VERDICT = {
  ELIGIBLE: EligibleResult,
  PARTIAL: PartialMatchResult,
  NOT_ELIGIBLE: NotEligibleResult,
} satisfies Record<Verdict, unknown>;

/** The AI screening result page for one verdict (the analysis is named in ?analysis=). */
export default function ScreeningResultPage({ verdict }: { verdict: Verdict }) {
  const Result = RESULT_BY_VERDICT[verdict];
  return <ScreeningResultLoader verdict={verdict} render={(props) => <Result {...props} />} />;
}
