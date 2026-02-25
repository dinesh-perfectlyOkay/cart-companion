export type DetectionStatus = "scanning" | "detected" | "not_shopping" | "blocked";
export type CouponStatus = "idle" | "testing" | "applied" | "failed" | "best_found";

export interface SiteInfo {
  domain: string;
  platform?: string;
  confidence: number;
  status: DetectionStatus;
  signals: string[];
}

export interface Coupon {
  id: string;
  code: string;
  source: "json" | "ai" | "manual";
  status: CouponStatus;
  discount?: string;
  description?: string;
}

export interface CouponResult {
  coupon: Coupon;
  savings: number;
  originalPrice: number;
  finalPrice: number;
}
