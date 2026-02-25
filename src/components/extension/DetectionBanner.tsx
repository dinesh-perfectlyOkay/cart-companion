import { motion } from "framer-motion";
import { Shield, ShieldCheck, ShieldX, Loader2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SiteInfo } from "@/types/extension";

interface DetectionBannerProps {
  site: SiteInfo;
}

const statusConfig = {
  scanning: {
    icon: Loader2,
    label: "Scanning…",
    className: "bg-muted text-muted-foreground",
    iconClass: "animate-spin text-muted-foreground",
  },
  detected: {
    icon: ShieldCheck,
    label: "Shopping site detected",
    className: "bg-accent text-accent-foreground",
    iconClass: "text-primary",
  },
  not_shopping: {
    icon: ShoppingCart,
    label: "Not a shopping site",
    className: "bg-muted text-muted-foreground",
    iconClass: "text-muted-foreground",
  },
  blocked: {
    icon: ShieldX,
    label: "Blocked (major retailer)",
    className: "bg-secondary text-secondary-foreground",
    iconClass: "text-muted-foreground",
  },
};

export function DetectionBanner({ site }: DetectionBannerProps) {
  const config = statusConfig[site.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-3 ${config.className}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Icon className={`h-5 w-5 ${config.iconClass}`} />
          {site.status === "detected" && (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{config.label}</p>
          <p className="text-xs opacity-70 truncate">{site.domain}</p>
        </div>
        {site.platform && (
          <Badge variant="secondary" className="text-[10px] shrink-0">
            {site.platform}
          </Badge>
        )}
      </div>

      {site.status === "detected" && site.signals.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {site.signals.map((signal) => (
            <span
              key={signal}
              className="inline-block rounded-full bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {signal}
            </span>
          ))}
        </div>
      )}

      {site.status === "detected" && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span>Confidence</span>
            <span className="font-mono font-semibold">{Math.round(site.confidence * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-background/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${site.confidence * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
