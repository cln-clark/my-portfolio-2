import { DM_Serif_Display, DM_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
});

type TechCategory = "Language" | "Frontend" | "Backend" | "Database" | "Tools";

const techCategories: TechCategory[] = [
  "Language",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
];

interface TechStack {
  category: TechCategory;
  name: string;
}

const techStacks: TechStack[] = [
  { category: "Language", name: "Java" },
  { category: "Language", name: "Python" },
  { category: "Language", name: "TypeScript" },
  { category: "Frontend", name: "React" },
  { category: "Frontend", name: "Next.js" },
  { category: "Frontend", name: "Tailwind CSS" },
  { category: "Backend", name: "Node.js" },
  { category: "Backend", name: "Express.js" },
  { category: "Backend", name: "REST API" },
  { category: "Database", name: "MySQL" },
  { category: "Database", name: "Firebase" },
  { category: "Tools", name: "Git / GitHub" },
  { category: "Tools", name: "VS Code" },
];

const meta = [
  { id: 1, label: "Location", value: "City of Imus, Cavite · PH" },
  { id: 2, label: "Status", value: "Open to Work" },
  { id: 3, label: "Education", value: "BS Information Technology" },
  { id: 4, label: "University", value: "Cavite State University" },
];

const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

const project = [
  { id: 1, name: "Project 1", description: "Project Description 1" },
  { id: 2, name: "Project 2", description: "Project Description 2" },
  { id: 3, name: "Project 3", description: "Project Description 3" }
];

export default function Home() {
  return (
    <div className={`w-full min-h-screen ${dmMono.className}`}>

      
      <nav className="w-full h-14 flex items-center bg-[var(--background)]/60 backdrop-blur-md justify-between border-b border-[var(--border)] px-6 sticky top-0 z-50" /* Nav Bar*/>
        <h1 className="text-sm font-bold tracking-wide">ClarkLouise.dev</h1>
        <ul className="flex gap-6 text-xs tracking-wide">
          {navItems.map((item) => (
            <li key={item}
              className="text-[var(--foreground)]/50 hover:text-[var(--foreground)] border-b border-transparent hover:border-[var(--foreground)] pb-0.5 transition-all duration-200 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-4xl mx-auto px-6">

        <section className="py-24"/* Hero section */>
          <div className="flex items-center gap-2 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-[var(--foreground)]/50 uppercase tracking-widest">
              Trainee
            </span>
          </div>

          <h1 className={`text-5xl leading-snug tracking-wide mb-4 ${dmSerif.className}`}>
            Hi, I&apos;m Clark. <br />
            I build things{" "}
            <em className="text-[var(--foreground)]/40">that matter.</em>
          </h1>

          <p className="text-sm text-[var(--foreground)]/60 max-w-md leading-relaxed mb-8">
            Junior developer who enjoys transforming ideas into reliable,
            well-structured software solutions — with a focus on backend systems
            and clean architecture.
          </p>

          <div className="flex gap-2">
            <Button className="h-9 px-5 text-xs rounded-md shadow-lg text-[var(--background)] bg-[var(--foreground)] hover:-translate-y-0.5 hover:bg-[var(--foreground)]">
              View my work →
            </Button>
            <Button variant="outline" className="h-9 px-5 text-xs shadow-lg rounded-md hover:-translate-y-0.5 transition-transform ">
              Get in touch
            </Button>
          </div>
        </section>


        
        <section className="py-16"/*About Me */>
          <SectionLabel text="About Me" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
            <div className="space-y-4 text-sm text-[var(--foreground)]/70 leading-relaxed">
              <p>
                I&apos;m an aspiring software developer with a particular
                interest in backend development — creating APIs, handling data,
                and designing clean, maintainable systems.
              </p>
              <p>
                Most of my experience comes from academic projects where I built
                web applications, Android applications, and IoT-based systems.
                I was team leader and sole programmer on my capstone project,
                NeGeShoCa — a smart shopping cart powered by Arduino and
                Firebase.
              </p>
              <p>
                In my free time, I experiment with side projects and learn new
                tools at my own pace.
              </p>
            </div>

            <div className="space-y-5">
              {meta.map(({ id, label, value }) => (
                <div key={id}>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40">
                    {label}
                  </span>
                  <p className="text-sm mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section className="py-17"/* Tech Stack */>
          <SectionLabel text="Tech Stack" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-6">
            {techCategories.map((category) => {
              const stacks = techStacks.filter((s) => s.category === category);
              return (
                <div key={category} className="flex flex-col gap-3">

                  <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 pb-1">
                    {category}
                  </span>

                  <div className="flex flex-col gap-1.5">
                    {stacks.map((stack) => (
                      <span
                        key={stack.name}
                        className="text-xs px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--accent)]/5 text-[var(--foreground)]/80 w-fit">
                        {stack.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-17"/* Projects */>
          <SectionLabel text="Projects"/>

          <div className="flex flex-col rounded-sm bg-[var(--card)] border border-[var(--border)] mt-6">
              { project.map((project) => (
                <div key={project.id} className=" border-b last:border-0 border-[var(--border)]">
                  <div className="flex items-center justify-between px-4 py-3">
                    <h2  className="text-sm font-medium">
                      {project.name}
                    </h2> 
                    <Button variant="outline" className="h-8 px-3 text-white bg-blue-500 text-xs shadow-md hover:bg-blue-500 hover:text-white hover:-translate-y-0.5 transition-transform ">
                      View Demo ↗
                    </Button>
                  </div>
                  <span className="text-xs text-[var(--foreground)]/60 p-4">
                    {project.description}
                  </span>
                </div>                            
                ))
              }
          </div>

        </section>

      </div>
    </div>
  );  
}

/* Reusable section label component  */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 whitespace-nowrap">
        {text}
      </span>
      <span className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}
