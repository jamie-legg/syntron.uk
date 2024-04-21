'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import AnimatedGradient from '.@/components/AnimatedGradient';

const DiscordPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {

    router.replace('https://discord.gg/dcpaauj');
  }, [router]);  

  return (
    <div className="w-screen h-screen overflow-hidden">
      <AnimatedGradient>
        <ArrowPathIcon className="h-24 w-24 text-sky-900 animate-spin -mt-8" />
      </AnimatedGradient>
    </div>
  );
};

export default DiscordPage;
