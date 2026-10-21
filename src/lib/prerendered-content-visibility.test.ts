import { describe, expect, it } from "vitest";
import { renderRoute } from "@/entry-server";
import { aboutContent } from "@/lib/about-content";
import { landingContent } from "@/lib/landing-content";
import { serviceDetailsFrench } from "@/lib/services-details-fr";

const decodeHtmlEntities = (text: string) =>
  text
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const renderVisibleText = async (route: string) => {
  const { html } = await renderRoute(route);
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
};

// Search engines read the prerendered HTML only: text inside closed accordions and
// inactive tabs must still be present in it.
describe("prerendered content hidden behind interactive widgets", () => {
  it("keeps every FAQ answer in the HTML of /faq", async () => {
    const text = await renderVisibleText("/faq");
    for (const item of landingContent.fr.faq.items) {
      expect(text, item.question).toContain(item.answer);
    }
  });

  it("keeps the closed FAQ answers hidden from visitors in the prerendered HTML", async () => {
    const { html } = await renderRoute("/faq");
    const hiddenPanels = html.match(/<div[^>]*role="region"[^>]*hidden=""|<div[^>]*hidden=""[^>]*role="region"/g) ?? [];
    expect(hiddenPanels).toHaveLength(landingContent.fr.faq.items.length);
  });

  it("keeps every offering of a service in the HTML of its page", async () => {
    const text = await renderVisibleText("/services/saas");
    for (const offering of serviceDetailsFrench.saas.offerings) {
      expect(text, offering.tabLabel).toContain(offering.headline);
      expect(text, offering.tabLabel).toContain(offering.description);
    }
  });

  it("shows only the first offering of a service to visitors", async () => {
    const { html } = await renderRoute("/services/saas");
    const hiddenPanels = html.match(/<div[^>]*role="tabpanel"[^>]*>/g)?.filter((tag) => tag.includes('hidden=""')) ?? [];
    expect(hiddenPanels).toHaveLength(serviceDetailsFrench.saas.offerings.length - 1);
  });

  it("keeps the content of every about tab in the HTML of /a-propos", async () => {
    const text = await renderVisibleText("/a-propos");
    const { who, journey, method, contact } = aboutContent.fr.tabs;
    for (const tab of [who, journey, method, contact]) {
      expect(text, tab.label).toContain(tab.paragraphs[0]);
    }
  });
});
