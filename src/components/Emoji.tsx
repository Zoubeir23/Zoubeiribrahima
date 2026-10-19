interface EmojiProps {
  symbol: string;
  className?: string;
}

const Emoji = ({ symbol, className = "" }: EmojiProps) => (
  <span aria-hidden="true" className={`inline-block leading-none ${className}`.trim()}>
    {symbol}
  </span>
);

export default Emoji;
