import { MARQUEE_ITEMS } from "@/app/data/portfolio";
import { Sparkle } from "@/app/components/ui/blob";

type TapeProps = {
  items: readonly string[];
  bg: string;
  rotate: string;
  reverse?: boolean;
};

function Tape({ items, bg, rotate, reverse = false }: TapeProps) {
  // Content is duplicated so the -50% translate loops seamlessly.
  const row = [...items, ...items];
  return (
    <div
      className={`pause-on-hover absolute inset-x-[-4%] overflow-hidden border-y-2 border-ink py-3 ${bg}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <div className={`flex w-max whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display flex items-center gap-6 px-6 text-lg uppercase tracking-tight text-ink md:text-2xl"
            aria-hidden={i >= items.length}
          >
            {item}
            <Sparkle className="h-4 w-4 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

const TAPE_A = MARQUEE_ITEMS.filter((item) => item !== "•");
const TAPE_B = ["Accessible by default", "Design to deploy", "AI-assisted workflow", "Built to ship", "Figma to production"];

/** Two crossing "sticker tape" strips, like the reference grid's banners. */
export function MarqueeStrip() {
  return (
    <div className="relative my-10 h-32 overflow-hidden md:my-14 md:h-36" role="presentation">
      <Tape items={TAPE_A} bg="bg-bubblegum" rotate="-1.6deg" />
      <div className="absolute inset-0 top-9">
        <Tape items={TAPE_B} bg="bg-zest" rotate="1.4deg" reverse />
      </div>
    </div>
  );
}
