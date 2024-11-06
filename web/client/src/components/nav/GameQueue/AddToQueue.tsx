/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lXWxwWQWRbo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AddToQueue() {
  const [isInQueue, setIsInQueue] = useState(false);
  const [playerCount, setPlayerCount] = useState(12);
  const [disabled, setDisabled] = useState(false);
  const handleQueueToggle = () => {
    setIsInQueue(!isInQueue);
    setPlayerCount(isInQueue ? playerCount - 1 : playerCount + 1);
  };

  useEffect(() => {
    if (playerCount >= 12) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [playerCount]);

  return (
    <div className="flex w-full justify-between gap-4">
    <div></div>
      <div className="flex">
        <Button
          onClick={handleQueueToggle}
          className="flex items-center"
          disabled
        >
          {isInQueue ? (
            <>
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
              <span>Leave</span>
            </>
          ) : (
            <>
              <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
              <span>Join</span>
            </>
          )}
        </Button>
        <div className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-sky-300">
          Live Queue Coming Soon
        </div>
      </div>
    </div>
  );
}
