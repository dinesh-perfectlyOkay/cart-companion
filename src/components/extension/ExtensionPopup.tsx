import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Square, Settings, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetectionBanner } from "./DetectionBanner";
import { CouponList } from "./CouponList";
import { ManualCouponInput } from "./ManualCouponInput";
import { SavingsSummary } from "./SavingsSummary";
import type { SiteInfo, Coupon, CouponResult } from "@/types/extension";

// Mock data
const mockSite: SiteInfo = {
  domain: "coolshop.example.com",
  platform: "Shopify",
  confidence: 0.92,
  status: "detected",
  signals: ["Schema.org Product", "/checkout path", "Add to Cart button", "Price pattern"],
};

const mockCoupons: Coupon[] = [
  { id: "1", code: "SAVE20", source: "json", status: "best_found", discount: "$12.40", description: "20% off sitewide" },
  { id: "2", code: "WELCOME10", source: "ai", status: "applied", discount: "$6.20", description: "New customer discount" },
  { id: "3", code: "FREESHIP", source: "json", status: "failed", description: "Free shipping over $50" },
  { id: "4", code: "SPRING25", source: "ai", status: "idle", description: "Spring sale code" },
];

const mockResult: CouponResult = {
  coupon: mockCoupons[0],
  savings: 12.4,
  originalPrice: 62.0,
  finalPrice: 49.6,
};

export function ExtensionPopup() {
  const [site] = useState<SiteInfo>(mockSite);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [autoApply, setAutoApply] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddCoupon = (code: string) => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code,
      source: "manual",
      status: "idle",
      description: "Manually added",
    };
    setCoupons((prev) => [...prev, newCoupon]);
  };

  const testedCount = coupons.filter((c) => c.status !== "idle").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[380px] rounded-xl border bg-card shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground leading-none">CouponSnap</h1>
            <p className="text-[10px] text-muted-foreground">Auto coupon finder</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Detection Status */}
      <div className="px-4 pt-3">
        <DetectionBanner site={site} />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Switch
            id="auto-apply"
            checked={autoApply}
            onCheckedChange={setAutoApply}
            className="scale-90"
          />
          <Label htmlFor="auto-apply" className="text-xs cursor-pointer">
            Auto-test coupons
          </Label>
        </div>
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant={isRunning ? "destructive" : "default"}
            className="h-7 text-xs px-3 gap-1.5"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Square className="h-3 w-3" /> Stop
              </>
            ) : (
              <>
                <Play className="h-3 w-3" /> Test All
              </>
            )}
          </Button>
          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-4">
        <Tabs defaultValue="coupons" className="w-full">
          <TabsList className="w-full h-8 p-0.5">
            <TabsTrigger value="coupons" className="flex-1 text-xs h-7">
              Coupons ({coupons.length})
            </TabsTrigger>
            <TabsTrigger value="results" className="flex-1 text-xs h-7">
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coupons" className="mt-3 space-y-3">
            <ManualCouponInput onAdd={handleAddCoupon} />
            <CouponList coupons={coupons} bestCouponId="1" />
          </TabsContent>

          <TabsContent value="results" className="mt-3 space-y-3">
            <SavingsSummary result={mockResult} />
            <div className="text-center text-xs text-muted-foreground py-2">
              Tested {testedCount} of {coupons.length} coupons
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30 px-4 py-2 text-center text-[10px] text-muted-foreground">
        {testedCount}/{coupons.length} tested · Last scan: just now
      </div>
    </motion.div>
  );
}
