export default function AnimatedGradient({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-800 to-sky-300 animate-gradient-x flex justify-center place-content-center align-middle place-items-center">
      {children}
    </div>
  );
}
