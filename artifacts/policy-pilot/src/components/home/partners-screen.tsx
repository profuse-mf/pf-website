import React, { useState } from "react";
import { ArrowLeft, Loader2, ChevronRight, Star, Zap } from "lucide-react";
import { getPartnersByType, resolvePartnerUrl, type Partner } from "@/data/partners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/ui/brand-logo";

interface PartnersScreenProps {
  vehicleType: "car" | "bike";
  registrationNumber: string;
  model?: string;
  onBack: () => void;
}

export default function PartnersScreen({ vehicleType, registrationNumber, model, onBack }: PartnersScreenProps) {
  const [redirectingTo, setRedirectingTo] = useState<string | null>(null);

  const partners = getPartnersByType(vehicleType);
  const featured = partners.find((p) => p.id === "acko-car");
  const rest = partners.filter((p) => p.id !== "acko-car");

  const handlePartnerClick = (partner: Partner) => {
    setRedirectingTo(partner.name);
    window.open(resolvePartnerUrl(partner, registrationNumber), "_blank");
    setTimeout(() => setRedirectingTo(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 px-4 container mx-auto max-w-5xl relative">
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

      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-6 -ml-3 text-muted-foreground hover:text-foreground"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
        <h2 className="text-3xl tracking-tight">
          Best plans for {registrationNumber.toUpperCase()}
        </h2>
        <p className="text-muted-foreground type-body mt-2 text-lg">
          {model ? `We found these top-rated insurers for your ${model}.` : "We found these top-rated insurers for you."}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Featured Acko card ── */}
        {featured && (
          <Card
            data-testid={`card-partner-${featured.id}`}
            className="group relative overflow-hidden cursor-pointer border-2 border-primary shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary/5 via-background to-background"
            onClick={() => handlePartnerClick(featured)}
          >
            {/* Recommended ribbon */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5 z-10">
              <Star className="w-3 h-3 fill-current" /> Recommended
            </div>

            <CardContent className="p-5 sm:p-7">
              {/* Logo + name row — always horizontal */}
              <div className="flex items-center gap-4 mb-4">
                <BrandLogo
                  logoUrl={featured.logoUrl}
                  name={featured.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl border-2 border-primary/20 bg-white p-1.5 sm:p-2 shadow-md"
                  fallbackClassName="text-2xl font-bold text-muted-foreground"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{featured.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-0.5">{featured.tagline}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <Badge className="bg-primary text-primary-foreground border-0">
                  {featured.highlight}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">Cashless claims</Badge>
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                  <Zap className="w-3 h-3 mr-1" /> Instant Policy
                </Badge>
              </div>

              {/* CTA — full width on mobile, auto on desktop */}
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-md shadow-primary/20 group-hover:shadow-lg transition-all"
                onClick={(e) => { e.stopPropagation(); handlePartnerClick(featured); }}
              >
                View Plan Details
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Other partners ── */}
        {rest.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground font-medium px-1">Other options</p>
            <div className="grid md:grid-cols-2 gap-5">
              {rest.map((partner) => {
                const isPopular = partner.highlight === "Most Popular";
                return (
                  <Card
                    key={partner.id}
                    data-testid={`card-partner-${partner.id}`}
                    className={`group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/40 cursor-pointer ${
                      isPopular ? "border-primary/30" : ""
                    }`}
                    onClick={() => handlePartnerClick(partner)}
                  >
                    {isPopular && (
                      <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg flex items-center gap-1 z-10">
                        <Star className="w-3 h-3" /> Most Popular
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <BrandLogo
                          logoUrl={partner.logoUrl}
                          name={partner.name}
                          className="w-12 h-12 shrink-0 rounded-xl border bg-white p-1.5 shadow-sm"
                          fallbackClassName="text-lg font-bold text-muted-foreground"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h3 className="text-lg truncate pr-8">{partner.name}</h3>
                          <p className="text-sm text-muted-foreground type-notes line-clamp-1">{partner.tagline}</p>
                          <div className="pt-2 flex flex-wrap gap-2">
                            {partner.highlight && (
                              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                                {partner.highlight}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-muted-foreground">Cashless claims</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t flex items-center justify-between text-sm font-semibold text-primary">
                        <span>View Plan Details</span>
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
