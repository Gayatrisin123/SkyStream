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
      "Share your screen in real-time to present ideas, demonstrate workflows, or troubleshoot issues. Perfect for remote teams, live demos, and online training sessions. With low-latency performance, it's like being in the same room — even when you're continents apart.",
    src: "https://www.sorryonmute.com/wp-content/uploads/2022/08/Feature-Image-2.png",
  },
  {
    name: "Video Calling",
    type: "Face-to-Face Communication",
    quote:
      "Experience smooth, high-quality video conferencing that bridges the distance. Ideal for meetings, interviews, and daily check-ins, our video calling feature makes remote interaction more human and engaging.",
    src: "https://thumbs.dreamstime.com/b/conference-video-call-people-talking-to-each-other-monitor-screen-working-home-remote-project-management-conference-video-186775025.jpg",
  },
  {
    name: "File Sharing",
    type: "Secure Transfer System",
    quote:
      "Easily upload, download, and manage documents, images, videos, and more. Our file sharing system ensures fast delivery and end-to-end encryption, making collaboration efficient and secure across devices and platforms.",
    src: "https://mumbaimirror.indiatimes.com/photo/76099716.cms",
  },
];

export default function Home3() {
  return (
    <div className="flex justify-end items-center">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-3/5">
        <h1 className="text-white text-3xl font-semibold shadow-md mt-2 -mb-7">
          Our Components Brief
        </h1>
        <AnimatedTestimonials testimonials={data} autoplay={true} />
      </div>
    </div>
  );
}
