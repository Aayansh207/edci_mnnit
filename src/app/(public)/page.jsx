
import SplitText from "@/components/SplitText";
import GradientWaves from "@/components/GradientWaves";
import PublicFooter from "@/components/layout/public-footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Gradient Waves Background */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          relief={1}
          lightAngle={120}
          mouseInteraction
          swellOnClick
          lightMode={false}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={64}
          zoom={1}
          height={5.5}
          fogDepth={15}
          sheen={0}
          brightness={1}
          opacity={1}
          grain={0.2}
          quality="medium"
          intro
          parallaxStrength={0.5}
          mouseStrength={0.6}
          paused={false}
        />
      </div>

      {/* Homepage Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 text-center">


        <SplitText
          text="Empowering Innovation & Entrepreneurship at MNNIT"
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight max-w-4xl"
          delay={40}
        />
        <SplitText
          text="The unified platform for students, startup incubatees,
          mentors, and industry partners to collaborate, build,
          and scale ventures."
          className="text-sm sm:text-md font-extralight text-slate-400 tracking-tight max-w-4xl"
          delay={20}
        />


      </div>

      {/* Footer content */}

    </div>
  );
}
