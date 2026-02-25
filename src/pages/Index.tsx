import { ExtensionPopup } from "@/components/extension/ExtensionPopup";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Extension Popup Preview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive prototype of the CouponSnap Chrome extension popup
          </p>
        </div>
        <ExtensionPopup />
      </div>
    </div>
  );
};

export default Index;
