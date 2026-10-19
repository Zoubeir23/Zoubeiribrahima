import { useState } from "react";
import { serviceMeta, type ServiceSlug } from "@/lib/service-meta";

interface ServiceIllustrationProps {
  slug: ServiceSlug;
  className?: string;
  emojiClassName?: string;
}

const ServiceIllustration = ({ slug, className = "aspect-[4/3] w-32", emojiClassName = "text-5xl" }: ServiceIllustrationProps) => {
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const { emoji, illustrationPath } = serviceMeta[slug];

  if (hasImageFailed) {
    return (
      <span aria-hidden="true" className={`flex items-center justify-center rounded-md bg-[var(--surface-raised)] ${emojiClassName} ${className}`}>
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={illustrationPath}
      alt=""
      width={578}
      height={432}
      loading="lazy"
      onError={() => setHasImageFailed(true)}
      className={`rounded-md bg-white object-contain ${className}`}
    />
  );
};

export default ServiceIllustration;
