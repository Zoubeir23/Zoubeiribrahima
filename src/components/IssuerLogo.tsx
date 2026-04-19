interface IssuerLogoProps {
  issuer: string;
}

/* ── Official Microsoft logo (4 colored squares) ── */
const MicrosoftLogo = () => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path fill="#F1511B" d="M121.666 121.666H0V0h121.666z" />
    <path fill="#80CC28" d="M256 121.666H134.335V0H256z" />
    <path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z" />
    <path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z" />
  </svg>
);

/* ── Official LinkedIn logo ── */
const LinkedInLogo = () => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      fill="#0A66C2"
    />
  </svg>
);

/* ── Official HackerRank logo (simple-icons) ── */
const HackerRankLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <rect width="24" height="24" fill="#00EA64" />
    <path
      d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z"
      fill="#FFFFFF"
    />
  </svg>
);

/* ── Official Cisco logo (simple-icons) ── */
const CiscoLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      fill="#0096D6"
      d="M16.331 18.171V17.06l-.022.01c-.25.121-.522.19-.801.203a1.186 1.186 0 01-.806-.237 1.038 1.038 0 01-.352-.498 1.21 1.21 0 01-.023-.667c.052-.225.178-.426.357-.569.16-.134.355-.218.562-.242a1.85 1.85 0 011.061.198l.024.013v-1.117l-.051-.014a2.862 2.862 0 00-1.011-.132 2.34 2.34 0 00-.903.206c-.287.132-.54.327-.739.571a2.221 2.221 0 00-.04 2.705c.295.378.709.645 1.175.756.491.12 1.006.102 1.487-.052l.082-.023M5.336 18.171V17.06l-.022.01c-.25.121-.522.19-.801.203a1.183 1.183 0 01-.806-.237 1.03 1.03 0 01-.351-.498 1.202 1.202 0 01-.024-.667c.052-.225.177-.426.357-.569.16-.134.355-.218.562-.242a1.85 1.85 0 011.061.198l.024.013v-1.117l-.051-.014a2.862 2.862 0 00-1.011-.132 2.344 2.344 0 00-.903.206 2.08 2.08 0 00-.74.571 2.224 2.224 0 00-.041 2.705 2.11 2.11 0 001.176.756c.491.12 1.005.102 1.487-.052l.083-.023M9.26 17.249l-.004.957.07.012c.22.041.441.069.664.085.195.019.391.022.587.012.187-.014.372-.049.551-.104.21-.06.405-.163.571-.305a1.16 1.16 0 00.333-.478 1.31 1.31 0 00-.007-.96 1.068 1.068 0 00-.298-.414 1.261 1.261 0 00-.438-.255l-.722-.268a.388.388 0 01-.197-.188.245.245 0 01.008-.219.382.382 0 01.154-.142.798.798 0 01.257-.074c.153-.022.308-.021.46.005.18.02.358.051.533.096l.038.008v-.883l-.069-.015a4.749 4.749 0 00-.543-.097 2.844 2.844 0 00-.714-.003c-.3.027-.585.143-.821.33-.16.126-.281.293-.351.484-.104.29-.105.608 0 .899.054.145.14.274.252.381.097.093.207.173.327.236.157.084.324.149.497.195.057.017.114.035.17.054l.085.031.024.01c.084.03.162.078.226.14.045.042.08.094.101.151a.325.325 0 01.001.161.339.339 0 01-.166.198.856.856 0 01-.275.086 2.032 2.032 0 01-.427.021 5.208 5.208 0 01-.557-.074 9.195 9.195 0 01-.287-.067l-.033-.006zm-2.475.995h1.05v-4.167h-1.05v4.167zm12.162-2.936a1.095 1.095 0 011.541.158 1.094 1.094 0 01-.157 1.541l-.017.014a1.096 1.096 0 01-1.367-1.713m-1.525.854a2.193 2.193 0 002.666 2.107 2.139 2.139 0 00.701-3.937 2.207 2.207 0 00-3.367 1.83M22.961 10.728a.52.52 0 001.039 0V9.573a.52.52 0 00-1.039 0v1.155M20.117 10.728a.522.522 0 001.041 0V8.139a.521.521 0 00-1.04 0v2.589M17.231 11.771a.521.521 0 001.039 0V6.17a.52.52 0 00-1.039 0v5.601M14.393 10.728a.521.521 0 001.04 0V8.139a.52.52 0 00-1.039 0v2.589M11.494 10.728a.522.522 0 001.039 0V9.573a.52.52 0 00-1.039 0v1.155M8.624 10.728a.52.52 0 001.039 0V8.139a.52.52 0 00-1.039 0v2.589M5.737 11.771a.52.52 0 001.039 0V6.17a.52.52 0 00-1.039 0v5.601M2.876 10.728a.522.522 0 001.04 0V8.139a.52.52 0 00-1.039 0v2.589M0 10.728a.521.521 0 001.039 0V9.573a.52.52 0 00-1.039 0v1.155"
    />
  </svg>
);

/* ── Official Coursera logo (simple-icons) ── */
const CourseraLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      fill="#0056D2"
      d="M11.374 23.977c-4.183-.21-8.006-2.626-9.959-6.347-2.097-3.858-1.871-8.864.732-12.454C4.748 1.338 9.497-.698 14.281.23c4.583.857 8.351 4.494 9.358 8.911 1.122 4.344-.423 9.173-3.925 12.04-2.289 1.953-5.295 2.956-8.34 2.797zm7.705-8.05a588.737 588.737 0 0 0-3.171-1.887c-.903 1.483-2.885 2.248-4.57 1.665-2.024-.639-3.394-2.987-2.488-5.134.801-2.009 2.79-2.707 4.357-2.464a4.19 4.19 0 0 1 2.623 1.669c1.077-.631 2.128-1.218 3.173-1.855-2.03-3.118-6.151-4.294-9.656-2.754-3.13 1.423-4.89 4.68-4.388 7.919.54 3.598 3.73 6.486 7.716 6.404a7.664 7.664 0 0 0 6.404-3.563z"
    />
  </svg>
);

/* ── Official Anthropic logo (simple-icons) ── */
const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      fill="#191919"
      d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"
    />
  </svg>
);

/* ── Harvard CS50 — shield Harvard public ── */
const HarvardLogo = () => (
  <img
    src="https://commons.wikimedia.org/wiki/Special:FilePath/Harvard_University_shield.svg"
    alt="Harvard University shield"
    className="w-6 h-6 object-contain"
    loading="lazy"
    referrerPolicy="no-referrer"
    onError={(event) => {
      event.currentTarget.onerror = null;
      event.currentTarget.src = "/logos/cert-default.svg";
    }}
  />
);

/* ── Cursa — logo public de la société ── */
const CursaLogo = () => (
  <img
    src="https://media.licdn.com/dms/image/v2/C4D0BAQFveMkSMhYI9A/company-logo_200_200/company-logo_200_200/0/1644934823241/cursa_online_courses_logo?e=2147483647&v=beta&t=vDNJT7VMPqc6pliV0CvYAWovk6x7wMVzw4jouicFFd4"
    alt="Cursa"
    className="w-6 h-6 object-contain"
    loading="lazy"
    referrerPolicy="no-referrer"
    onError={(event) => {
      event.currentTarget.onerror = null;
      event.currentTarget.src = "/logos/cert-default.svg";
    }}
  />
);

/* ── Udemy — logo officiel (Simple Icons) ── */
const UdemyLogo = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      fill="#A435F0"
      d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z"
    />
  </svg>
);

/* ── Fallback : initiales sur fond coloré ── */
const DefaultLogo = ({ issuer }: { issuer: string }) => {
  const palette: Record<string, string> = {
    "Cursa - Cursos Online": "#4CBBF5",
    "Credly": "#FF6B2B",
  };
  const bg = palette[issuer] ?? "#020285";
  const initials = issuer
    .split(/[\s\-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="w-6 h-6 flex items-center justify-center rounded-sm font-display font-black text-white"
      style={{ backgroundColor: bg, fontSize: "8px", lineHeight: 1 }}
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
    case "Coursera":
      return <CourseraLogo />;
    case "Anthropic":
      return <AnthropicLogo />;
    case "Harvard CS50":
      return <HarvardLogo />;
    case "Cursa - Cursos Online":
      return <CursaLogo />;
    case "Udemy":
      return <UdemyLogo />;
    default:
      return <DefaultLogo issuer={issuer} />;
  }
};

export default IssuerLogo;
