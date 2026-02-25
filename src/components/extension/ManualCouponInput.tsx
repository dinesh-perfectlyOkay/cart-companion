import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ManualCouponInputProps {
  onAdd: (code: string) => void;
}

export function ManualCouponInput({ onAdd }: ManualCouponInputProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed) {
      onAdd(trimmed);
      setCode("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter coupon code…"
        className="h-9 text-sm font-mono uppercase tracking-wider"
      />
      <Button type="submit" size="sm" disabled={!code.trim()} className="h-9 px-3 shrink-0">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}
