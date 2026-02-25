import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import type { CouponResult } from "@/types/extension";

interface SavingsSummaryProps {
  result: CouponResult | null;
}

export function SavingsSummary({ result }: SavingsSummaryProps) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg border border-success/30 bg-success/10 p-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <TrendingDown className="h-4 w-4 text-success" />
        <span className="text-sm font-semibold text-success">Best savings found!</span>
      </div>
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">Original</p>
          <p className="text-sm line-through text-muted-foreground">
            ${result.originalPrice.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground">With coupon</p>
          <p className="text-lg font-bold text-foreground">${result.finalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-1.5 text-center">
        <span className="inline-block rounded-full bg-success/20 px-3 py-0.5 text-xs font-bold text-success">
          You save ${result.savings.toFixed(2)} with {result.coupon.code}
        </span>
      </div>
    </motion.div>
  );
}
