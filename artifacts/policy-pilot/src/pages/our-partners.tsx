import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ALL_PARTNERS } from "@/data/partners";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export default function OurPartnersPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Our Insurance Partners</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            PolicyPilot connects you with India's most trusted motor insurance providers. We compare
            plans across all partners to find you the best coverage at the lowest price.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {ALL_PARTNERS.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`card-partner-${partner.id}`}
              className="group flex flex-col gap-3 p-6 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-muted border flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {partner.name.substring(0, 2).toUpperCase()}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{partner.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{partner.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {partner.vehicleTypes.map((type) => (
                  <Badge key={type} variant="outline" className="capitalize text-xs">
                    {type}
                  </Badge>
                ))}
                {partner.highlight && (
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20 text-xs">
                    {partner.highlight}
                  </Badge>
                )}
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
