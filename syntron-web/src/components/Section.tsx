import { cn } from "@/lib/utils";

export default function Section({
  title,
  sections,
  action,
  children
}: {
  title: string;
  sections: string[];
  action?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-2 w-72 z-40 py-2">
    <div className="w-full flex justify-between">
      <h1 className="uppercase font-extrabold text-lg text-slate-300 mt-2">{title}</h1>
      <div className="mb-2">{!!action && action}</div>
    </div>
      <div className="border-sky-500 border-t">
        <div className="pt-2">{sections[0]}</div>
        {sections.slice(1).map((section, index) => (
          <div key={index}>
            <div className="my-2 border-b border-sky-800"></div>
            <div className={cn(`pb-2 border-sky-800`, index===sections.length-2? `border-b` : ``)}>{section}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
