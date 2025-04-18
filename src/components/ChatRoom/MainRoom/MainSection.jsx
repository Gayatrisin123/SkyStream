import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CircleFadingPlus, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../ui/card";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function MainSection() {
  return (
    <section className="relative py-28 px-6 sm:px-10 lg:px-16 bg-black overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-700 via-black to-blue-700 opacity-20 blur-3xl"></div>

      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-6">
          <motion.div
            variants={textVariant(0.3)}
            initial="hidden"
            animate="show"
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              Create a Room,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Connect
              </span>{" "}
              Instantly Anywhere
            </h1>
          </motion.div>
          <motion.div
            variants={textVariant(0.8)}
            initial="hidden"
            animate="show"
          >
            <p className="text-lg md:text-xl text-gray-400">
              Collaborate seamlessly with our powerful screen sharing and live
              chat platform.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-14 w-full max-w-3xl">
          <motion.div
            variants={textVariant(1.4)}
            initial="hidden"
            animate="show"
          >
            <Card
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_12px_45px_rgba(31,38,135,0.4)] hover:border-gradient-to-r hover:from-purple-500 hover:to-blue-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))",
              }}
            >
              <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-xl opacity-30"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <CircleFadingPlus className="h-8 w-8 text-purple-500 duration-300 hover:scale-110 transition-transform" />
                  Create a Room
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Create a room and chat with others instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/createroom">
                  <Button className="w-full bg-gradient-to-r border-2 border-gray-500 text-white hover:shadow-lg hover:shadow-purple-500/50 text-white transition-transform transform hover:scale-105 rounded-lg">
                    Create Room
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={textVariant(2.1)}
            initial="hidden"
            animate="show"
          >
            <Card
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-transform duration-300 hover:scale-[1.015] hover:shadow-[0_12px_45px_rgba(31,38,135,0.4)] hover:border-gradient-to-r hover:hover:from-purple-400 hover:to-yellow-400"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))",
              }}
            >
              <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-green-400 blur-xl opacity-30"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Users className="h-8 w-8 text-blue-500 hover:scale-110 transition-transform duration-300" />
                  Join a Room
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Enter a chat room code to start chatting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/joinroom">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-500 text-white bg-gradient-to-r hover:shadow-lg transition-transform transform hover:scale-105 rounded-lg"
                  >
                    Join Room
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
