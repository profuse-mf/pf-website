import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import InstantApplyPage from "@/pages/instant-apply";
import OffersPage from "@/pages/offers";
import OurPartnersPage from "@/pages/our-partners";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import HowItWorksPage from "@/pages/how-it-works";
import FaqPage from "@/pages/faq";
import CrmLoginPage from "@/pages/crm/login";
import CrmDashboard from "@/pages/crm/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/instant-apply" component={InstantApplyPage} />
      <Route path="/offers" component={OffersPage} />
      <Route path="/partners" component={OurPartnersPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/crm" component={CrmLoginPage} />
      <Route path="/crm/dashboard" component={CrmDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
