interface ServiceTickerProps {
  items: readonly string[];
  label: string;
}

const ServiceTicker = ({ items, label }: ServiceTickerProps) => {
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
            {item}
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
