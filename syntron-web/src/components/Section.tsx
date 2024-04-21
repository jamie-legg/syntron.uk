export default function Section({
  title,
  sections,
  children
}: {
  title: string;
  sections: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-2 w-72 z-40">
      <h1 className="uppercase font-extrabold text-lg">{title}</h1>
      <div className="border-sky-500 border-t">
        <div className="pt-2">{sections[0]}</div>
        {sections.slice(1).map((section, index) => (
          <div key={index}>
            <div className="my-2 border-b border-sky-800"></div>
            <div className="pb-2 border-b border-sky-800">{section}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
