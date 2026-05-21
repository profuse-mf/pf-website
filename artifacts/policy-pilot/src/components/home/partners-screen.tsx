import React, { useState } from "react";
import { ArrowLeft, Loader2, ChevronRight, Star, Zap, CheckCircle2, Building2, ShieldCheck } from "lucide-react";
import { getPartnersByType, resolvePartnerUrl, type Partner } from "@/data/partners";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/ui/brand-logo";

interface PartnersScreenProps {
  vehicleType: "car" | "bike";
  registrationNumber: string;
  model?: string;
  onBack: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-foreground">{rating}</span>
    </div>
  );
}

function StatPill({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-1.5 bg-muted/60 rounded-lg px-2.5 py-1.5">
      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
      <div>
        <div className="text-xs font-bold text-foreground leading-none">{value}</div>
        <div className="text-[10px] text-muted-foreground leading-none mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function PartnersScreen({ vehicleType, registrationNumber, model, onBack }: PartnersScreenProps) {
  const [redirectingTo, setRedirectingTo] = useState<string | null>(null);

  const partners = getPartnersByType(vehicleType);
  const featured = partners.find((p) => p.id === "acko-car") ?? partners[0];
  const rest = partners.filter((p) => p.id !== featured?.id);

  const handlePartnerClick = (partner: Partner) => {
    setRedirectingTo(partner.name);
    window.open(resolvePartnerUrl(partner, registrationNumber), "_blank");
    setTimeout(() => setRedirectingTo(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 px-4 container mx-auto max-w-3xl relative">
      {redirectingTo && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
            <h3 className="text-xl font-bold">Redirecting you...</h3>
            <p className="text-muted-foreground text-sm">
              Taking you to {redirectingTo} to complete your purchase securely.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 -ml-3 text-muted-foreground hover:text-foreground"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Best plans for <span className="text-primary">{registrationNumber.toUpperCase()}</span>
        </h2>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          {model ? `Top-rated insurers for your ${model}` : "Top-rated insurers matched for you"}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* ── Featured card ── */}
        {featured && (
          <div
            data-testid={`card-partner-${featured.id}`}
            onClick={() => handlePartnerClick(featured)}
            className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary"
          >
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-primary to-blue-500 px-5 py-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
                <BrandLogo logoUrl={featured.logoUrl} name={featured.name} className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-bold text-lg leading-tight">{featured.name}</h3>
                  <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" /> Recommended
                  </span>
                </div>
                <p className="text-blue-100 text-sm mt-0.5">{featured.tagline}</p>
                <div className="mt-1.5">
                  <StarRating rating={featured.rating} />
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-5 py-4 space-y-4">
              {/* Key stats row */}
              <div className="grid grid-cols-2 gap-2">
                <StatPill
                  icon={ShieldCheck}
                  value={`${featured.claimSettlementRatio}%`}
                  label="Claim Settlement"
                />
                <StatPill
                  icon={Building2}
                  value={featured.networkGarages}
                  label="Network Garages"
                />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                  <Star className="w-3 h-3 mr-1 fill-current" /> {featured.highlight}
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                  <Zap className="w-3 h-3 mr-1" /> Instant Policy
                </Badge>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {featured.features.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {f}
                  </span>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full h-11 text-sm font-semibold shadow-md shadow-primary/20"
                onClick={(e) => { e.stopPropagation(); handlePartnerClick(featured); }}
              >
                View Plan Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* ── Other partners ── */}
        {rest.length > 0 && (
          <>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mt-2">Other options</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {rest.map((partner) => (
                <div
                  key={partner.id}
                  data-testid={`card-partner-${partner.id}`}
                  onClick={() => handlePartnerClick(partner)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-white"
                >
                  {partner.highlight && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {partner.highlight}
                    </div>
                  )}

                  <div className="h-1.5 bg-gradient-to-r from-primary/60 to-primary" />

                  <div className="p-4 space-y-3">
                    {/* Logo + name + rating */}
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-muted/50 border flex items-center justify-center shrink-0">
                        <BrandLogo logoUrl={partner.logoUrl} name={partner.name} className="w-8 h-8 object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm leading-tight truncate pr-10">{partner.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{partner.tagline}</p>
                        <div className="mt-1">
                          <StarRating rating={partner.rating} />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <StatPill icon={ShieldCheck} value={`${partner.claimSettlementRatio}%`} label="Claim Settlement" />
                      <StatPill icon={Building2} value={partner.networkGarages} label="Network Garages" />
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-1">
                      {partner.features.map((f) => (
                        <span key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-2 border-t flex items-center justify-between text-sm font-semibold text-primary group-hover:text-primary/80">
                      <span>View Plan Details</span>
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
