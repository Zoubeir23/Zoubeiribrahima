import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import RouteScrollReset from "@/components/RouteScrollReset";
import { MotionConfig } from "@/lib/static-motion";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Every page except the home page is split into its own chunk to keep the first load light.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
import { usePointerSpotlight } from "./hooks/usePointerSpotlight";
const ApplicationRoutes = () => {
  usePointerSpotlight();

  return (
    <MotionConfig reducedMotion="always">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouteScrollReset />
          <Suspense fallback={<div className="min-h-screen bg-[var(--surface-deepest)]" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
      </TooltipProvider>
    </MotionConfig>
  );
};

export default ApplicationRoutes;
