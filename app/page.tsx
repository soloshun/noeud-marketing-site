import { Apply } from "@/components/site/apply";
import { Audience } from "@/components/site/audience";
import { Corridors } from "@/components/site/corridors";
import { Film } from "@/components/site/film";
import { Footer } from "@/components/site/footer";
import { Founder } from "@/components/site/founder";
import { Hero } from "@/components/site/hero";
import { Institutions } from "@/components/site/institutions";
import { Lifecycle } from "@/components/site/lifecycle";
import { Nav } from "@/components/site/nav";
import { Pricing } from "@/components/site/pricing";
import { Questions } from "@/components/site/questions";
import { Statement } from "@/components/site/statement";
// import { SurfaceTour } from "@/components/site/surface-tour";
import { Surfaces } from "@/components/site/surfaces";
import { Trade } from "@/components/site/trade";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Corridors />
        <Audience />
        <Trade />
        <Surfaces />
        {/* <SurfaceTour /> */}
        <Film />
        <Lifecycle />
        <Pricing />
        <Institutions />
        <Founder />
        <Questions />
        <Statement />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
