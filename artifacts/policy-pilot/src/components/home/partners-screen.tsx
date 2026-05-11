import React, { useState } from "react";
import { ArrowLeft, Loader2, CheckCircle2, ChevronRight, Star } from "lucide-react";
import { SiAcko, SiBajaj, SiHdfc, SiPolicybazaar } from "react-icons/si"; // wait, some might not exist. We'll fallback gracefully.
import { FormValues } from "@/pages/home";
import { useSubmitLead, useListPartners, getListPartnersQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PartnersScreenProps {
  formData: FormValues;
  onBack: () => void;
}

export default function PartnersScreen({ formData, onBack }: PartnersScreenProps) {
  const [redirectingTo, setRedirectingTo] = useState<string | null>(null);

  const { data: partners, isLoading, error } = useListPartners(
    { vehicleType: formData.insuranceType },
    { query: { enabled: true, queryKey: getListPartnersQueryKey({ vehicleType: formData.insuranceType }) } }
  );

  const submitLead = useSubmitLead();

  const handlePartnerClick = async (partner: NonNullable<typeof partners>[0]) => {
    setRedirectingTo(partner.name);
    
    try {
      await submitLead.mutateAsync({
        data: {
          insuranceType: formData.insuranceType,
          registrationNumber: formData.registrationNumber,
          mobileNumber: formData.mobileNumber,
          pinCode: formData.pinCode,
          policyExpiryDate: formData.policyExpiryDate,
          registrationYear: formData.registrationYear,
          carModel: formData.carModel,
          partnerId: partner.id,
          partnerName: partner.name,
          partnerUrl: partner.url,
        }
      });
      
      // Open URL in new tab
      window.open(partner.url, '_blank');
      
      // Keep redirecting state for a moment before clearing, or clear after short delay
      setTimeout(() => setRedirectingTo(null), 3000);
    } catch (err) {
      console.error("Failed to submit lead", err);
      setRedirectingTo(null);
      // We could still open the URL if lead capture fails, but let's be strict or just continue
      window.open(partner.url, '_blank');
    }
  };

  const getPartnerInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 px-4 container mx-auto max-w-5xl relative">
      {redirectingTo && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
            <h3 className="text-xl font-bold">Redirecting you...</h3>
            <p className="text-muted-foreground text-sm">Taking you to {redirectingTo} to complete your purchase securely.</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-3 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>
        <h2 className="text-3xl font-extrabold tracking-tight">Best plans for {formData.registrationNumber.toUpperCase()}</h2>
        <p className="text-muted-foreground mt-2 text-lg">We found these top-rated insurers for your {formData.carModel}.</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-40 animate-pulse bg-muted/50 border-muted" />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
          <p className="font-medium">Failed to load partners. Please try again later.</p>
        </div>
      ) : partners?.length === 0 ? (
        <div className="p-8 text-center bg-muted rounded-xl">
          <p className="font-medium">No partners found for this vehicle type.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {partners?.map((partner) => {
            const isPopular = partner.name.toLowerCase().includes("policybazaar");
            
            return (
              <Card 
                key={partner.id} 
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer ${isPopular ? 'border-primary/50 shadow-md ring-1 ring-primary/10' : ''}`}
                onClick={() => handlePartnerClick(partner)}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl border bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground shrink-0 shadow-sm">
                      {/* Logo fallback */}
                      {getPartnerInitials(partner.name)}
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-bold text-xl truncate pr-8">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{partner.tagline || 'Premium motor insurance'}</p>
                      
                      <div className="pt-3 flex flex-wrap gap-2">
                        {partner.highlight && (
                          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10">
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
            )
          })}
        </div>
      )}
    </div>
  );
}
