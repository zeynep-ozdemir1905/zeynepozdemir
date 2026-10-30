import { Flower, Sparkle } from "@/app/components/ui/blob";
import { PROFILE } from "@/app/data/portfolio";

/**
 * Opening title card: the name pops in letter by letter, then the whole card
 * slides up to reveal the site. Pure CSS (see `.splash*` in globals.css), so it
 * renders in the first HTML paint with no hydration flash, and is skipped
 * entirely for visitors who prefer reduced motion.
 */
export function IntroSplash() {
  const words = PROFILE.name.split(" ");
  let letterIndex = 0;

  return (
    <div className="splash" aria-hidden>
      <Flower
        lobes={8}
        depth={0.24}
        fill="#f9a8c9"
        className="splash-blob absolute -left-24 -top-24 h-[22rem] w-[22rem] rotate-12"
      />
      <Flower
        lobes={6}
        depth={0.3}
        fill="#eaf7a6"
        className="splash-blob absolute -bottom-28 -right-20 h-[24rem] w-[24rem] -rotate-6"
        style={{ animationDelay: "0.15s" }}
      />
      <Sparkle className="splash-blob absolute left-[14%] top-[62%] h-8 w-8 text-ink" style={{ animationDelay: "0.5s" }} />
      <Sparkle className="splash-blob absolute right-[16%] top-[22%] h-10 w-10 text-ink" style={{ animationDelay: "0.7s" }} />

      <p className="font-display relative flex flex-col items-center gap-1 text-center text-[clamp(3rem,13vw,9rem)] uppercase leading-[0.92] text-ink">
        {words.map((word) => (
          <span key={word} className="flex">
            {word.split("").map((char) => {
              const i = letterIndex++;
              return (
                <span key={`${word}-${i}`} className="splash-letter" style={{ animationDelay: `${0.15 + i * 0.055}s` }}>
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </p>
      <p className="splash-sub absolute bottom-[14%] text-xs font-extrabold uppercase tracking-[0.3em] text-ink-muted md:text-sm">
        {PROFILE.credential}
      </p>
    </div>
  );
}
