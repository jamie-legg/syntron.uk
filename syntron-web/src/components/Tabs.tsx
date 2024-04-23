import { cn } from "@/lib/utils";
import { TTabs } from "./auth/TAuthTypes";

// const tabs = [
//   { name: 'My Account', href: '#', current: false },
//   { name: 'Company', href: '#', current: false },
//   { name: 'Team Members', href: '#', current: true },
//   { name: 'Billing', href: '#', current: false },
// ]

export default function Tabs({ tabs }: { tabs: TTabs[] }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-sky-300 focus:border-slate-500 focus:ring-slate-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-sky-500">
          <nav className="-mb-px flex justify-around" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={cn(
                  tab.current
                    ? "border-slate-500 text-slate-600"
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
