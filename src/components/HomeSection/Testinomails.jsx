import React, { useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import avatar1 from "../../assets/UserProfile.png";
import avatar2 from "../../assets/TestUser4.png";
import avatar3 from "../../assets/TestUser2.png";
import avatar4 from "../../assets/TestUser1.png";
import avatar5 from "../../assets/TestUser4.png";
import avatar6 from "../../assets/TestUser3.png";
import avatar7 from "../../assets/TestUser2.png";
import avatar8 from "../../assets/UserProfile.png";
import avatar9 from "../../assets/TestUser2.png";
import avatar10 from "../../assets/TestUser3.png";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

const testimonials = [
  {
    text: "SkyStream is hands down the easiest way we've ever collaborated remotely. No installs, just share a link and you're in!",
    imageSrc: avatar1,
    name: "Aarav Mehta",
    username: "@aaravmehta",
  },
  {
    text: "The screen sharing and video quality are insanely good. It feels like we're all in the same room, even when we’re continents apart.",
    imageSrc: avatar2,
    name: "Sophia Martinez",
    username: "@soph.codes",
  },
  {
    text: "We switched our client calls to SkyStream and never looked back. Secure, crystal-clear video and no login headaches.",
    imageSrc: avatar3,
    name: "Riya Kapoor",
    username: "@riyakapoor",
  },
  {
    text: "Our remote workshops used to be chaotic—SkyStream changed that overnight. Real-time chat + screen sharing = smooth sessions.",
    imageSrc: avatar4,
    name: "Mark Carlos",
    username: "@markcarl",
  },
  {
    text: "The QR code join feature is a genius move. We onboard users in seconds without technical support.",
    imageSrc: avatar5,
    name: "Kavya Iyer",
    username: "@kavya.iyer",
  },
  {
    text: "We run weekly team standups on SkyStream. No lag, no stress, and sharing files is super fast and secure.",
    imageSrc: avatar6,
    name: "Liam Bennett",
    username: "@liamcodes",
  },
  {
    text: "SkyStream gives me full control over privacy without any setup. It’s perfect for confidential meetings.",
    imageSrc: avatar7,
    name: "Ananya Verma",
    username: "@ananyav",
  },
  {
    text: "I’ve used a lot of collab tools, but none match SkyStream's balance of speed, security, and simplicity.",
    imageSrc: avatar8,
    name: "Shubham Roy",
    username: "@shubroy",
  },
  {
    text: "Whether it’s client demos or internal syncs, SkyStream makes it frictionless. No installs, just results.",
    imageSrc: avatar9,
    name: "Meera Joshi",
    username: "@meerajoshi",
  },
  {
    text: "Everything just works—no training needed. SkyStream is a no-brainer for remote teams like ours.",
    imageSrc: avatar10,
    name: "Daniel Kim",
    username: "@danieldev",
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
        duration: duration || 12,
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
              className="group relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),_0_20px_50px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 pointer-events-none group-hover:before:absolute group-hover:before:inset-0 group-hover:before:bg-gradient-to-r group-hover:before:from-transparent group-hover:before:via-white/10 group-hover:before:to-transparent group-hover:before:animate-[shine_1.6s_infinite] group-hover:before:blur-md" />

              {/* Soft gradient glow */}
              <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-transparent blur-3xl opacity-20" />

              <p className="text-sm leading-relaxed text-zinc-200 relative z-10">
                “{text}”
              </p>

              {/* Avatar + user info */}
              <div className="mt-6 flex items-center gap-3 relative z-10">
                <div className="relative h-12 w-12">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-pink-500 blur-md opacity-30 group-hover:opacity-50 transition" />
                  <img
                    src={imageSrc}
                    alt={name}
                    className="relative z-10 h-12 w-12 rounded-full border-2 border-white/10"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-zinc-400">{username}</p>
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

  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 10,
      duration: 2000,
      easing: "ease",
      once: false,
    });
  }, []);

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
          <div className="flex justify-center -mt-14">
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
            From intuitive design to powerful features, our website has become an
            essential tool for users around the world.
          </p>
        </motion.div>
        <div data-aos="zoom-in-down" className="flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
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
