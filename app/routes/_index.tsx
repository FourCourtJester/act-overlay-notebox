import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div className="rounded-lg bg-border shadow-outer p-1">
      <div className="rounded bg-gradient shadow-inner p-2">
          The box
      </div>
    </div>
  );
}
