import Emoji from "@/components/Emoji";

interface ServiceTickerProps {
  items: readonly string[];
  emojis?: readonly string[];
  label: string;
}

const ServiceTicker = ({ items, emojis = [], label }: ServiceTickerProps) => {
  const repeatedItems = [...items, ...items];

  return (
    <div
      className="ticker-viewport border-y border-[var(--surface-border)] bg-[var(--surface-base)] py-4"
      role="region"
      aria-label={label}
    >
      <ul className="ticker-track gap-10 px-5">
        {repeatedItems.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex shrink-0 items-center gap-10 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] sm:text-sm"
          >
            <span className="flex items-center gap-3">
              {emojis[index % items.length] ? <Emoji symbol={emojis[index % items.length]} className="text-lg" /> : null}
              {item}
            </span>
            <span aria-hidden="true" className="text-[var(--accent-orange)]">
              ◆
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceTicker;
