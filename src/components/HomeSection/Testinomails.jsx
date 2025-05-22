import React, { useRef } from "react";
import avatar1 from "../../assets/TestUser1.png";
import avatar2 from "../../assets/TestUser1.png";
import avatar3 from "../../assets/TestUser1.png";
import avatar4 from "../../assets/TestUser1.png";
import avatar5 from "../../assets/TestUser1.png";
import avatar6 from "../../assets/TestUser1.png";
import avatar7 from "../../assets/TestUser1.png";
import avatar8 from "../../assets/TestUser1.png";
import avatar9 from "../../assets/TestUser1.png";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

const testimonials = [
  {
    text: "Mvpblocks has completely changed the way I build UIs. Copy-paste, done. No more design stress.",
    imageSrc: avatar1,
    name: "Arjun Mehta",
    username: "@arjdev",
  },
  {
    text: "Honestly shocked at how smooth the animations and styling are out of the box. Just works.",
    imageSrc: avatar2,
    name: "Sara Lin",
    username: "@sara.codes",
  },
  {
    text: "Our team launched a client site in 2 days using Mvpblocks. Saved so much time.",
    imageSrc: avatar3,
    name: "Devon Carter",
    username: "@devninja",
  },
  {
    text: "Plugged a few blocks into our existing codebase and everything blended perfectly. Massive W.",
    imageSrc: avatar4,
    name: "Priya Shah",
    username: "@priyacodes",
  },
  {
    text: "Found a beautiful hero section, dropped it into V0, tweaked copy, and shipped in 15 minutes.",
    imageSrc: avatar5,
    name: "Leo Martin",
    username: "@leobuilds",
  },
  {
    text: "Mvpblocks helped us prototype multiple landing pages without writing CSS once.",
    imageSrc: avatar6,
    name: "Chloe Winters",
    username: "@chloewinters",
  },
  {
    text: "As a solo founder, Mvpblocks lets me move fast without sacrificing design quality.",
    imageSrc: avatar7,
    name: "Ayaan Malik",
    username: "@ayaan_dev",
  },
  {
    text: "Can’t believe how polished the components look. Clients are impressed every time.",
    imageSrc: avatar8,
    name: "Monica Reeves",
    username: "@monicareeves",
  },
  {
    text: "This tool is a lifesaver when deadlines are tight. Drop in a block, tweak, and deploy.",
    imageSrc: avatar9,
    name: "James Roy",
    username: "@jamesrdev",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = ({ className, testimonials, duration }) => (
  <div className={className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration: duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-8"
    >
      {[...new Array(2).fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {testimonials.map(({ text, imageSrc, name, username }) => (
            <div
              key={text}
              className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl group"
            >
              {/* Background shimmer */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),transparent_70%)]" />
              </div>

              {/* Gradient halo */}
              <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-pink-500/30 blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500" />

              <p className="text-sm text-zinc-200 leading-relaxed z-10 relative">
                “{text}”
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3 z-10 relative">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-pink-500 blur-md opacity-30 group-hover:opacity-50 transition" />
                  <img
                    src={imageSrc}
                    alt={name}
                    className="h-11 w-11 rounded-full border border-white/20 z-10 relative"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {name}
                  </span>
                  <span className="text-xs text-zinc-400">{username}</span>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))]}
    </motion.div>
  </div>
);

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="reviews" className="relative z-10 bg-gradient-to-b from-[#050505] via-[#111] to-[#050505] py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="mx-auto max-w-[540px]"
        >
          <div className="flex justify-center">
            <button
              type="button"
              className="group relative z-[60] mx-auto rounded-full border border-zinc-500/80 bg-background/50 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/[0.1] active:scale-100 md:text-sm"
            >
              <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
              <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
              <span className="relative">Testimonials</span>
            </button>
          </div>
          <h2
            className={
              "mt-5 text-white bg-gradient-to-r from-foreground/60 via-foreground to-foreground/60 bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 md:text-[54px] md:leading-[60px]"
            }
          >
            What our users say
          </h2>
          <p className="mt-3 text-center text-lg text-zinc-500">
            From intuitive design to powerful features, our app has become an
            essential tool for users around the world.
          </p>
        </motion.div>
        <div className="flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
