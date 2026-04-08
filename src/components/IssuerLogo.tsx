interface IssuerLogoProps {
  issuer: string;
}

const MicrosoftLogo = () => (
  <svg viewBox="0 0 21 21" className="w-5 h-5">
    <rect x="0" y="0" width="10" height="10" fill="#F25022" />
    <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
    <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
    <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
  </svg>
);

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="3" fill="#0A66C2" />
    <path
      d="M6.94 8.5C7.88 8.5 8.5 7.87 8.5 7.07 8.5 6.26 7.88 5.65 6.94 5.65 6 5.65 5.5 6.26 5.5 7.07 5.5 7.87 6 8.5 6.94 8.5ZM5.67 18.5H8.21V9.81H5.67V18.5ZM10.12 9.81V18.5H12.66V13.9C12.66 12.19 13.71 11.7 14.49 11.7 15.27 11.7 16.14 12.26 16.14 13.86V18.5H18.67V13.44C18.67 10.86 17.16 9.6 15.35 9.6 13.82 9.6 12.89 10.34 12.6 11V9.81H10.12Z"
      fill="white"
    />
  </svg>
);

const HackerRankLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path
      d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2Z"
      fill="#00EA64"
    />
    <path
      d="M9.5 8H11V11H13V8H14.5V16H13V12.5H11V16H9.5V8Z"
      fill="#1A1A1A"
    />
  </svg>
);

const CiscoLogo = () => (
  <svg viewBox="0 0 60 24" className="w-6 h-4" fill="#1BA0D7">
    <rect x="0" y="10" width="4" height="4" rx="2" />
    <rect x="7" y="7" width="4" height="10" rx="2" />
    <rect x="14" y="4" width="4" height="16" rx="2" />
    <rect x="21" y="7" width="4" height="10" rx="2" />
    <rect x="28" y="10" width="4" height="4" rx="2" />
    <rect x="35" y="7" width="4" height="10" rx="2" />
    <rect x="42" y="4" width="4" height="16" rx="2" />
    <rect x="49" y="7" width="4" height="10" rx="2" />
    <rect x="56" y="10" width="4" height="4" rx="2" />
  </svg>
);

const UdemyLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="3" fill="#A435F0" />
    <text
      x="5"
      y="18"
      fill="white"
      fontFamily="Arial Black, sans-serif"
      fontSize="16"
      fontWeight="900"
    >
      U
    </text>
  </svg>
);

const HarvardLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="3" fill="#A51C30" />
    <text
      x="5"
      y="18"
      fill="white"
      fontFamily="Arial Black, sans-serif"
      fontSize="16"
      fontWeight="900"
    >
      H
    </text>
  </svg>
);

const CourseraLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="3" fill="#0056D2" />
    <path
      d="M15 12C15 14.76 12.76 17 10 17 7.24 17 5 14.76 5 12 5 9.24 7.24 7 10 7 12.76 7 15 9.24 15 12Z"
      fill="white"
    />
    <path
      d="M15 12C15 10.5 15.5 9.5 17 9V15C15.5 14.5 15 13.5 15 12Z"
      fill="white"
    />
  </svg>
);

const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect width="24" height="24" rx="3" fill="#191919" />
    <path
      d="M14.5 7H16.5L20 17H18L17.2 14.5H13.8L13 17H11L14.5 7ZM14.4 13H16.6L15.5 9.5L14.4 13ZM4 7H7.5C9.7 7 11 8.2 11 10.2 11 12.2 9.7 13.5 7.5 13.5H6V17H4V7ZM6 11.8H7.3C8.4 11.8 9 11.2 9 10.2 9 9.2 8.4 8.7 7.3 8.7H6V11.8Z"
      fill="white"
    />
  </svg>
);

const DefaultLogo = ({ issuer }: { issuer: string }) => {
  const colors: Record<string, string> = {
    "Cursa - Cursos Online": "#4CBBF5",
    "Credly": "#FF6B2B",
  };
  const bg = colors[issuer] ?? "#020285";
  const initials = issuer
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="w-5 h-5 flex items-center justify-center rounded-sm font-display font-black text-white"
      style={{ backgroundColor: bg, fontSize: "7px", lineHeight: 1 }}
    >
      {initials}
    </div>
  );
};

const IssuerLogo = ({ issuer }: IssuerLogoProps) => {
  switch (issuer) {
    case "Microsoft":
      return <MicrosoftLogo />;
    case "LinkedIn":
      return <LinkedInLogo />;
    case "HackerRank":
      return <HackerRankLogo />;
    case "Cisco":
    case "Cisco Networking Academy":
      return <CiscoLogo />;
    case "Udemy":
      return <UdemyLogo />;
    case "Harvard CS50":
      return <HarvardLogo />;
    case "Coursera":
      return <CourseraLogo />;
    case "Anthropic":
      return <AnthropicLogo />;
    default:
      return <DefaultLogo issuer={issuer} />;
  }
};

export default IssuerLogo;
