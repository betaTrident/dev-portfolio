export type TechCategory = "frontend" | "backend" | "cloud" | "data" | "tooling";

export type TechGlobeItem = {
  id: string;
  name: string;
  short: string;
  category: TechCategory;
  color: string;
  /** Devicon SVG URL — resolved at runtime */
  iconUrl?: string;
};
