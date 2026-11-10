import { resourceBrandLogos, type ResourceBrand } from "@/data/resourceBrandLogos";

// The logos sit on a light tile so dark and colored marks stay readable on the dark theme.
// They only repeat what the guide title already says, so they are decorative for screen readers.

interface ResourceBrandLogosProps {
  brands: readonly ResourceBrand[];
  className?: string;
}

const ResourceBrandLogos = ({ brands, className = "" }: ResourceBrandLogosProps) => (
  <span className={`flex items-center gap-2 ${className}`}>
    {brands.map((brand) => (
      <span
        key={brand}
        className="flex h-11 w-11 items-center justify-center rounded-md bg-white p-2"
      >
        <img
          src={resourceBrandLogos[brand].path}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </span>
    ))}
  </span>
);

export default ResourceBrandLogos;
