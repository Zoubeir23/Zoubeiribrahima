import { useState } from "react";
import Emoji from "@/components/Emoji";
import { getTechnologyEmoji } from "@/lib/icon-sets";
import { getTechnologyLogo } from "@/lib/technology-logos";

interface TechnologyIconProps {
  name: string;
  className?: string;
}

const LOGO_SIZE_PIXELS = 20;

// Logos sit on a light badge so dark brand marks (Django, Vercel...) stay readable on the dark theme.
const TechnologyIcon = ({ name, className = "" }: TechnologyIconProps) => {
  const [hasLogoFailed, setHasLogoFailed] = useState(false);
  const logoPath = getTechnologyLogo(name);

  if (!logoPath || hasLogoFailed) {
    return <Emoji symbol={getTechnologyEmoji(name)} className={className} />;
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white p-1 ${className}`.trim()}
    >
      <img
        src={logoPath}
        alt=""
        width={LOGO_SIZE_PIXELS}
        height={LOGO_SIZE_PIXELS}
        loading="lazy"
        onError={() => setHasLogoFailed(true)}
        className="h-full w-full object-contain"
      />
    </span>
  );
};

export default TechnologyIcon;
