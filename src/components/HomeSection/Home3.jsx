import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

const data = [
  {
    name: "Chat Room",
    type: "Instant Messaging Platform",
    quote:
      "Connect instantly with individuals or teams using our fast, real-time chat rooms. Share updates, links, and ideas in a dynamic space designed for open communication and teamwork, all in one place.",
    src: "https://static.inlinx.com/1f3a33cd19/e69b0/linxapp/blog/5_what_is_the_chatroom_feature_cover.png",
  },
  {
    name: "Screen Sharing",
    type: "Live Collaboration Tool",
    quote:
      "Show your screen instantly to share ideas, demonstrate workflows, or guide others. Designed for teamwork and remote collaboration, our tool ensures clarity and connection. Collaborate from anywhere with high performance and no lag interruptions in real-time sessions.",
    src: "https://www.sorryonmute.com/wp-content/uploads/2022/08/Feature-Image-2.png",
  },
  {
    name: "Video Calling",
    type: "Face-to-Face Communication",
    quote:
      "Connect face-to-face from anywhere. Our video calling delivers smooth, high-quality performance for meetings, interviews, and check-ins. Stay close with teammates, clients, or family members — making virtual interaction feel personal, seamless, and effective every single time.",
    src: "https://thumbs.dreamstime.com/b/conference-video-call-people-talking-to-each-other-monitor-screen-working-home-remote-project-management-conference-video-186775025.jpg",
  },
  {
    name: "File Sharing",
    type: "Secure Transfer System",
    quote:
      "Share documents, images, and videos effortlessly across platforms. Our secure system ensures safe, fast transfers with encryption. Whether for work or personal use, sending and receiving files is streamlined and reliable — no stress, no waiting, just results.",
    src: "https://mumbaimirror.indiatimes.com/photo/76099716.cms",
  },
];

export default function Home3() {
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
    <div className="flex justify-end items-center overflow-hidden">
      <div className="w-full">
        <h1
          data-aos="zoom-in-down"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
          className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg"
        >
          Discover What Makes Us Unique
        </h1>
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="3000"
        >
          <AnimatedTestimonials testimonials={data} autoplay={true} />
        </div>
      </div>
    </div>
  );
}
