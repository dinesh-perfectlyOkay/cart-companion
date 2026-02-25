import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2, Sparkles, FileJson, User, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Coupon } from "@/types/extension";

interface CouponListProps {
  coupons: Coupon[];
  bestCouponId?: string;
  onApply?: (coupon: Coupon) => void;
}

const sourceIcons = {
  json: FileJson,
  ai: Sparkles,
  manual: User,
};

const statusIndicator = {
  idle: null,
  testing: <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />,
  applied: <Check className="h-3.5 w-3.5 text-success" />,
  failed: <X className="h-3.5 w-3.5 text-destructive" />,
  best_found: <Trophy className="h-3.5 w-3.5 text-warning" />,
};

export function CouponList({ coupons, bestCouponId, onApply }: CouponListProps) {
  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <Sparkles className="h-8 w-8 mb-2 opacity-40" />
        <p className="text-sm">No coupons available</p>
        <p className="text-xs opacity-60">Add manually or wait for AI suggestions</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <AnimatePresence mode="popLayout">
        {coupons.map((coupon, i) => {
          const SourceIcon = sourceIcons[coupon.source];
          const isBest = coupon.id === bestCouponId;

          return (
            <motion.div
              key={coupon.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ delay: i * 0.04 }}
              className={`group relative flex items-center gap-2.5 rounded-lg border p-2.5 transition-colors cursor-pointer hover:bg-accent/50 ${
                isBest ? "border-primary/40 bg-accent/30 ring-1 ring-primary/20" : "border-border"
              } ${coupon.status === "failed" ? "opacity-50" : ""}`}
              onClick={() => onApply?.(coupon)}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                <SourceIcon className="h-3.5 w-3.5 text-secondary-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <code className="text-sm font-bold tracking-wide truncate">{coupon.code}</code>
                  {isBest && (
                    <Badge className="bg-warning text-warning-foreground text-[9px] px-1.5 py-0">
                      BEST
                    </Badge>
                  )}
                </div>
                {coupon.description && (
                  <p className="text-[11px] text-muted-foreground truncate">{coupon.description}</p>
                )}
                {coupon.discount && coupon.status === "applied" && (
                  <p className="text-[11px] font-semibold text-success">Saved {coupon.discount}</p>
                )}
              </div>

              <div className="shrink-0">{statusIndicator[coupon.status]}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
