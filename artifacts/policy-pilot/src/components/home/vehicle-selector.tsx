import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBrands, type VehicleType, type Brand } from "@/data/vehicles";

interface VehicleSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleType: VehicleType;
  value: string;
  onChange: (value: string) => void;
}

const BRAND_COLORS: Record<string, string> = {
  maruti: "bg-blue-100 text-blue-700",
  hyundai: "bg-sky-100 text-sky-700",
  tata: "bg-indigo-100 text-indigo-700",
  honda: "bg-red-100 text-red-700",
  mahindra: "bg-red-100 text-red-800",
  toyota: "bg-rose-100 text-rose-700",
  kia: "bg-orange-100 text-orange-700",
  renault: "bg-yellow-100 text-yellow-800",
  volkswagen: "bg-blue-100 text-blue-800",
  skoda: "bg-green-100 text-green-700",
  mg: "bg-purple-100 text-purple-700",
  jeep: "bg-amber-100 text-amber-800",
  nissan: "bg-gray-100 text-gray-700",
  bmw: "bg-blue-100 text-blue-900",
  audi: "bg-gray-100 text-gray-800",
  mercedes: "bg-slate-100 text-slate-700",
  ford: "bg-blue-100 text-blue-700",
  citroen: "bg-gray-100 text-gray-600",
  hero: "bg-red-100 text-red-700",
  bajaj: "bg-blue-100 text-blue-700",
  tvs: "bg-yellow-100 text-yellow-800",
  royalenfield: "bg-green-100 text-green-800",
  yamaha: "bg-blue-100 text-blue-800",
  ktm: "bg-orange-100 text-orange-700",
  suzuki: "bg-blue-100 text-blue-700",
  kawasaki: "bg-green-100 text-green-700",
  ola: "bg-gray-100 text-gray-700",
  ather: "bg-teal-100 text-teal-700",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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

  function handleModelClick(model: string) {
    onChange(`${selectedBrand!.name} ${model}`);
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
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            {selectedBrand ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-primary hover:underline text-base font-semibold"
                data-testid="button-back-to-brands"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : null}
            {selectedBrand
              ? `Select ${label} Model — ${selectedBrand.name}`
              : `Select your ${label} brand`}
          </DialogTitle>
        </DialogHeader>

        {!selectedBrand ? (
          <ScrollArea className="h-[420px]">
            <div className="grid grid-cols-3 gap-3 p-6">
              {brands.map((brand) => {
                const colorClass = BRAND_COLORS[brand.id] ?? "bg-gray-100 text-gray-700";
                const isSelected = value.startsWith(brand.name);
                return (
                  <button
                    key={brand.id}
                    data-testid={`button-brand-${brand.id}`}
                    onClick={() => handleBrandClick(brand)}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                      hover:border-primary hover:shadow-md hover:shadow-primary/10
                      ${isSelected ? "border-primary bg-primary/5" : "border-border bg-card"}
                    `}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${colorClass}`}>
                      {getInitials(brand.name)}
                    </div>
                    <span className="text-xs font-medium text-center leading-tight">{brand.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className="h-[420px]">
            <div className="flex flex-col gap-1 p-4">
              {selectedBrand.models.map((model) => {
                const fullValue = `${selectedBrand.name} ${model}`;
                const isSelected = value === fullValue;
                return (
                  <button
                    key={model}
                    data-testid={`button-model-${model.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => handleModelClick(model)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg text-left
                      transition-all hover:bg-primary/5 hover:text-primary
                      ${isSelected ? "bg-primary/10 text-primary font-semibold" : "text-foreground"}
                    `}
                  >
                    <span className="text-sm">{model}</span>
                    {isSelected ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
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
