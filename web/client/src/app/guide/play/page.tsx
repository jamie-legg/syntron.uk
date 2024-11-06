"use client";;
import React from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@/app/camera/CameraControls";
import Navigation from "@/components/nav/Navigation";

const HowToPlayPage: React.FC = () => {
  return (
    <>
      <Navigation>
        <div className="flex-col w-full">
          <div className="flex w-full justify-around m-2">
          <div className="w-96">
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Game Modes
            </div>
            <ul>
              <li>Sumo - Survive in the arena until no enemies remain.</li>
              <li>Fortress - Fight with a team to conquer the enemy base.</li>
              <li>Deathmatch - Eliminate all players to win.</li>
              <li>Dogfight - Duel honourably with a single opponent.</li>
              <li>Racing - Race against other players to the finish line.</li>
              <li>
                Capture the Flag - Capture the enemy flag and return it to your
                base.
              </li>
            </ul>
          </div>
            <div className="w-96">
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Public Games
            </div>
            <ul>
              <li>
                The games population has slowly dwindled over the years. You can
                occasionally find a server with a few players, but many players
                now wait for pickup games.
              </li>
              <li>
                  Many servers still remain, and are great for learning the game.
              </li>
            </ul>
            </div>
            <div className="w-96">
            <div className="w-96 border-sky-500 border-y flex justify-center">
              Pickup
            </div>
            <ul>
              <li>
                Pickup games are a great way to learn the game and meet new
                players.
              </li>
              <li>
                You can find pickup games on the Discord server, by typing{" "}
                <span className="text-sky-100 font-bold">!add</span> in the{" "}
                <span className="text-sky-100 font-bold">#pickup</span> channel.
              </li>
            </ul>
            </div>
          </div>
        </div>
      </Navigation>
      <Canvas style={{ height: "100vh", background: "#000014" }}>
        <CameraControls />
      </Canvas>
    </>
  );
};

export default HowToPlayPage;
