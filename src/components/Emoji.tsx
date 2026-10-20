import { getEmojiIcon } from "@/lib/emoji-icons";

interface EmojiProps {
  symbol: string;
  className?: string;
}

// Content still references emoji symbols; they are rendered as sized-to-text icons for a professional look.
const Emoji = ({ symbol, className = "" }: EmojiProps) => {
  const Icon = getEmojiIcon(symbol);
  const combinedClassName = `inline-block leading-none ${className}`.trim();

  if (!Icon) {
    return (
      <span aria-hidden="true" data-emoji={symbol} className={combinedClassName}>
        {symbol}
      </span>
    );
  }

  return (
    <Icon
      aria-hidden="true"
      data-emoji={symbol}
      strokeWidth={1.75}
      className={`h-[1em] w-[1em] shrink-0 align-[-0.125em] ${combinedClassName}`}
    />
  );
};

export default Emoji;
