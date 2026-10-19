import Reveal from "@/components/Reveal";
import SectionHeading, { type SectionHeadingLevel } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Emoji from "@/components/Emoji";
import { useLandingContent } from "@/hooks/useLandingContent";
import { FAQ_EMOJIS } from "@/lib/icon-sets";

const FaqSection = ({ headingAs }: { headingAs?: SectionHeadingLevel }) => {
  const { faq } = useLandingContent();

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading headingAs={headingAs} emoji="❓" title={faq.title} />
      <Reveal delaySeconds={0.1}>
        <Accordion type="single" collapsible className="w-full">
          {faq.items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-item-${index}`}
              className="border-[var(--surface-border)]"
            >
              <AccordionTrigger className="text-left font-body text-base text-white hover:no-underline">
                <span className="flex items-center gap-3">
                  <Emoji symbol={FAQ_EMOJIS[index] ?? "❓"} className="text-xl" />
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-[var(--text-secondary)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
};

export default FaqSection;
