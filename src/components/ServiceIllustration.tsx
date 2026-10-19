import { useState } from "react";
import { serviceMeta, type ServiceSlug } from "@/lib/service-meta";

interface ServiceIllustrationProps {
  slug: ServiceSlug;
  className?: string;
  emojiClassName?: string;
}

const ServiceIllustration = ({ slug, className = "h-16 w-16", emojiClassName = "text-5xl" }: ServiceIllustrationProps) => {
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const { emoji, illustrationPath } = serviceMeta[slug];

  if (hasImageFailed) {
    return (
      <span aria-hidden="true" className={`flex items-center justify-center ${emojiClassName} ${className}`}>
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={illustrationPath}
      alt=""
      loading="lazy"
      onError={() => setHasImageFailed(true)}
      className={`object-contain ${className}`}
    />
  );
};

export default ServiceIllustration;
