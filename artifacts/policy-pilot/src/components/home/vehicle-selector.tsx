import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBrands, type VehicleType, type Brand } from "@/data/vehicles";
import BrandLogo from "@/components/ui/brand-logo";
import VehicleTypeIcon, { BODY_TYPE_LABEL, BODY_TYPE_COLOR } from "@/components/ui/vehicle-type-icon";

interface VehicleSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleType: VehicleType;
  value: string;
  onChange: (value: string) => void;
}

export default function VehicleSelector({
  open,
  onOpenChange,
  vehicleType,
  value,
  onChange,
}: VehicleSelectorProps) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const brands = getBrands(vehicleType);

  function handleBrandClick(brand: Brand) {
    setSelectedBrand(brand);
  }

  function handleModelClick(modelName: string) {
    onChange(`${selectedBrand!.name} ${modelName}`);
    setSelectedBrand(null);
    onOpenChange(false);
  }

  function handleBack() {
    setSelectedBrand(null);
  }

  function handleOpenChange(val: boolean) {
    if (!val) setSelectedBrand(null);
    onOpenChange(val);
  }

  const label = vehicleType === "car" ? "Car" : "Bike";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            {selectedBrand && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-primary hover:underline text-base font-semibold mr-1"
                data-testid="button-back-to-brands"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {selectedBrand
              ? `${selectedBrand.name} — Select Model`
              : `Select your ${label} brand`}
          </DialogTitle>
        </DialogHeader>

        {!selectedBrand ? (
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
                    <BrandLogo
                      logoUrl={brand.logoUrl}
                      name={brand.name}
                      className="w-12 h-12 object-contain"
                      fallbackClassName="rounded-full text-sm font-bold bg-muted"
                    />
                    <span className="text-xs font-medium text-center leading-tight line-clamp-2">{brand.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className="h-[440px]">
            <div className="flex flex-col gap-0.5 p-3">
              {selectedBrand.models.map((model) => {
                const fullValue = `${selectedBrand.name} ${model.name}`;
                const isSelected = value === fullValue;
                const colorClass = BODY_TYPE_COLOR[model.bodyType];
                const typeLabel = BODY_TYPE_LABEL[model.bodyType];
                return (
                  <button
                    key={model.name}
                    data-testid={`button-model-${model.name.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleModelClick(model.name)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg text-left
                      transition-all hover:bg-primary/5 group
                      ${isSelected ? "bg-primary/10" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-medium shrink-0 ${colorClass}`}>
                        <VehicleTypeIcon bodyType={model.bodyType} className="w-7 h-3.5" />
                        {typeLabel}
                      </span>
                      <span className={`text-sm font-medium truncate ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                        {model.name}
                      </span>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-primary shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2 group-hover:text-primary" />
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
