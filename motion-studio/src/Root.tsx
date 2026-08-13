import React from "react";
import { Composition } from "remotion";
import { NoeudFilm } from "./NoeudFilm";
import { HeroLoop, HERO_DURATION } from "./HeroLoop";
import { FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="HeroLoop"
      component={HeroLoop}
      durationInFrames={HERO_DURATION}
      fps={FPS}
      width={2560}
      height={1120}
    />
    <Composition
    id="NoeudFilm"
    component={NoeudFilm}
    durationInFrames={540}
    fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
