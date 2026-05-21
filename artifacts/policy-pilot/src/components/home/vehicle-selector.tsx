import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBrands, type VehicleType, type Brand, type Model } from "@/data/vehicles";
import BrandLogo from "@/components/ui/brand-logo";
import VehicleTypeIcon, { BODY_TYPE_LABEL, BODY_TYPE_COLOR } from "@/components/ui/vehicle-type-icon";
// BODY_TYPE_COLOR retained for potential future use

interface VehicleSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleType: VehicleType;
  value: string;
  variant: string;
  onChange: (model: string) => void;
  onVariantChange: (variant: string) => void;
}

type Step = "brand" | "model" | "variant";

export default function VehicleSelector({
  open,
  onOpenChange,
  vehicleType,
  value,
  variant,
  onChange,
  onVariantChange,
}: VehicleSelectorProps) {
  const [step, setStep] = useState<Step>("brand");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const brands = getBrands(vehicleType);
  const label = vehicleType === "car" ? "Car" : "Bike";

  function handleBrandClick(brand: Brand) {
    setSelectedBrand(brand);
    setStep("model");
  }

  function handleModelClick(model: Model) {
    setSelectedModel(model);
    if (model.variants.length > 0) {
      setStep("variant");
    } else {
      onChange(`${selectedBrand!.name} ${model.name}`);
      onVariantChange("");
      resetAndClose();
    }
  }

  function handleVariantClick(v: string) {
    onChange(`${selectedBrand!.name} ${selectedModel!.name}`);
    onVariantChange(v);
    resetAndClose();
  }

  function handleBack() {
    if (step === "variant") setStep("model");
    else if (step === "model") setStep("brand");
  }

  function resetAndClose() {
    setStep("brand");
    setSelectedBrand(null);
    setSelectedModel(null);
    onOpenChange(false);
  }

  function handleOpenChange(val: boolean) {
    if (!val) {
      setStep("brand");
      setSelectedBrand(null);
      setSelectedModel(null);
    }
    onOpenChange(val);
  }

  const titleMap: Record<Step, string> = {
    brand: `Select your ${label} brand`,
    model: `${selectedBrand?.name ?? ""} — Select Model`,
    variant: `${selectedModel?.name ?? ""} — Select Variant`,
  };

  const currentFullValue = value + (variant ? ` ${variant}` : "");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            {step !== "brand" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-primary hover:underline text-base font-semibold mr-1"
                data-testid="button-back-to-brands"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {titleMap[step]}
          </DialogTitle>
          {step !== "brand" && (
            <div className="flex gap-1 mt-2">
              {(["brand", "model", "variant"] as Step[]).map((s, i) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    ["brand", "model", "variant"].indexOf(step) >= i ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </DialogHeader>

        {step === "brand" && (
          <ScrollArea className="h-[440px]">
            <div className="grid grid-cols-3 gap-3 p-5">
              {brands.map((brand) => {
                const isSelected = value.startsWith(brand.name);
                return (
                  <button
                    key={brand.id}
                    data-testid={`button-brand-${brand.id}`}
                    onClick={() => handleBrandClick(brand)}
                    className={`
                      flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all
                      hover:border-primary hover:shadow-md hover:shadow-primary/10
                      ${isSelected ? "border-primary bg-primary/5" : "border-border bg-card"}
                    `}
                  >
                    {brand.logoUrl?.startsWith("/") ? (
                      <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
                        <BrandLogo
                          logoUrl={brand.logoUrl}
                          name={brand.name}
                          className="w-16 h-16 object-contain scale-[1.15] origin-center"
                          fallbackClassName="rounded-full text-sm font-bold bg-muted"
                        />
                      </div>
                    ) : (
                      <BrandLogo
                        logoUrl={brand.logoUrl}
                        name={brand.name}
                        className="w-12 h-12 object-contain"
                        fallbackClassName="rounded-full text-sm font-bold bg-muted"
                      />
                    )}
                    <span className="text-xs font-medium text-center leading-tight line-clamp-2">{brand.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {step === "model" && selectedBrand && (
          <ScrollArea className="h-[440px]">
            <div className="flex flex-col gap-0.5 p-3">
              {selectedBrand.models.map((model) => {
                const fullModelValue = `${selectedBrand.name} ${model.name}`;
                const isSelected = value === fullModelValue;
                const colorClass = BODY_TYPE_COLOR[model.bodyType];
                const typeLabel = BODY_TYPE_LABEL[model.bodyType];
                return (
                  <button
                    key={model.name}
                    data-testid={`button-model-${model.name.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleModelClick(model)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all hover:bg-primary/5 group
                      ${isSelected ? "bg-primary/10" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <span className={`text-sm font-medium block truncate ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                          {model.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{typeLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {model.variants.length > 0 && (
                        <span className="text-xs text-muted-foreground">{model.variants.length} variants</span>
                      )}
                      {isSelected ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {step === "variant" && selectedModel && (
          <ScrollArea className="h-[440px]">
            <div className="flex flex-col gap-0.5 p-3">
              {selectedModel.variants.map((v) => {
                const isSelected = variant === v && value === `${selectedBrand!.name} ${selectedModel.name}`;
                return (
                  <button
                    key={v}
                    data-testid={`button-variant-${v.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleVariantClick(v)}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-lg text-left transition-all hover:bg-primary/5 group
                      ${isSelected ? "bg-primary/10" : ""}
                    `}
                  >
                    <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {v}
                    </span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
