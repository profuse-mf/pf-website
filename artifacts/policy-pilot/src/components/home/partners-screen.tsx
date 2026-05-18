import React, { useState } from "react";
import { ArrowLeft, Loader2, ChevronRight, Star } from "lucide-react";
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

      <div className="grid md:grid-cols-2 gap-5">
        {partners.map((partner) => {
          const isPopular = partner.highlight === "Most Popular";

          return (
            <Card
              key={partner.id}
              data-testid={`card-partner-${partner.id}`}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer ${
                isPopular ? "border-primary/50 shadow-md ring-1 ring-primary/10" : ""
              }`}
              onClick={() => handlePartnerClick(partner)}
            >
              {isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 z-10">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}

              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <BrandLogo
                    logoUrl={partner.logoUrl}
                    name={partner.name}
                    className="w-14 h-14 shrink-0 rounded-xl border bg-white p-1.5 shadow-sm"
                    fallbackClassName="text-xl font-bold text-muted-foreground"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-xl truncate pr-8">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground type-notes line-clamp-1">{partner.tagline}</p>

                    <div className="pt-3 flex flex-wrap gap-2">
                      {partner.highlight && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
                        >
                          {partner.highlight}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-muted-foreground">
                        Cashless claims
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm font-semibold text-primary">
                  <span>View Plan Details</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
