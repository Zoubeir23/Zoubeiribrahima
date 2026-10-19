interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="mb-10 max-w-2xl sm:mb-14">
    <h2 className="font-display text-[clamp(1.6rem,4.5vw,2.75rem)] uppercase leading-tight text-white">{title}</h2>
    {subtitle ? <p className="mt-4 text-[var(--text-secondary)]">{subtitle}</p> : null}
  </div>
);

export default SectionHeading;
