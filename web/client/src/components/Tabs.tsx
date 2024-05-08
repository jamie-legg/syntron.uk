import { cn } from "@/lib/utils";
import { TTabs } from "./auth/TAuthTypes";

// const tabs = [
//   { name: 'My Account', href: '#', current: false },
//   { name: 'Company', href: '#', current: false },
//   { name: 'Team Members', href: '#', current: true },
//   { name: 'Billing', href: '#', current: false },
// ]

export default function Tabs({ tabs, setTabs }: { tabs: TTabs[], setTabs: (tabs: TTabs[]) => void}) {
  return (
    <div>
      <div className="block">
        <div className="pb-4 border-b border-sky-500">
          <nav className="-mb-px flex justify-around" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                onClick={() => setTabs(tabs.map((t) => ({ ...t, current: t.name === tab.name })))}
                key={tab.name}
                className={cn(
                  tab.current
                    ? "border-slate-300 text-slate-300"
                    : "border-transparent text-sky-500 hover:border-sky-300 hover:text-sky-300 transition-all",
                  "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
