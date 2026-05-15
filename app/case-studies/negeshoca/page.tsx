"use client";
import { useEffect, useRef } from "react";
import { DM_Serif_Display, DM_Mono } from "next/font/google";
import Link from "next/link";

const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: "400" });

interface RevealItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function RevealItem({ children, delay = 0, className = "" }: RevealItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-widest text-emerald-500 whitespace-nowrap">
        {text}
      </span>
      <span className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

const techStack = [
  { category: "Mobile",    items: ["Kotlin", "Android Studio"] },
  { category: "Hardware",  items: ["C++", "Arduino (ESP32)", "GM67 Barcode Scanner", "QR Scanner", "Thermal Printer"] },
  { category: "Backend",   items: ["REST API", "HTTP Requests"] },
  { category: "Database",  items: ["Firebase Realtime Database"] },
  { category: "Tools",     items: ["Arduino IDE", "Android Studio"] },
];

const features = [
  {
    title: "Barcode Scanning",
    description: "ESP32 reads product barcodes via GM67 scanner and sends HTTP requests to Firebase in real time.",
  },
  {
    title: "Live Cart Updates",
    description: "Scanned items are instantly reflected on the Android tablet UI using RecyclerView and Firebase listeners.",
  },
  {
    title: "QR Code Checkout",
    description: "Order ID is encoded as a lightweight QR code reference, scanned at the gate to authorize exit.",
  },
  {
    title: "REST API Integration",
    description: "Bypassed the unreliable Arduino Firebase library by connecting ESP32 directly to Firebase via REST API.",
  },
  {
    title: "Thermal Receipt Printing",
    description: "Prints an itemized receipt upon checkout completion directly from the hardware layer.",
  },
];

export default function NeGeShoCAPage() {
  return (
    <div className={`w-full min-h-screen ${dmMono.className}`}>

      {/* Nav */}
      <nav className="w-full h-14 flex items-center bg-[var(--background)]/60 backdrop-blur-md border-b border-[var(--border)] px-6 sticky top-0 z-50">
        
        <Link href="/" className="text-xs text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors">
          ← Back
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6">

        {/* Hero */}
        <section className="py-24">
          <RevealItem delay={0}>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500">
              Capstone Project · IoT
            </span>
          </RevealItem>

          <RevealItem delay={100}>
            <h1 className={`text-5xl leading-snug tracking-wide mt-4 mb-4 ${dmSerif.className}`}>
              NeGeShoCa
            </h1>
          </RevealItem>

          <RevealItem delay={200}>
            <p className="text-sm text-[var(--foreground)]/60 max-w-lg leading-relaxed">
              Next Generation Shopping Cart — an IoT-based smart shopping system 
              powered by Arduino (ESP32) and Firebase, built over one year as a capstone project. 
              I served as team leader and sole programmer, bridging hardware, mobile, and cloud layers.
            </p>
          </RevealItem>

          <RevealItem delay={300}>
            <div className="flex flex-wrap gap-3 mt-8">
              {["IoT", "Android", "Firebase", "Arduino", "1 Year", "Team Leader of 3"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded border border-[var(--border)] text-[var(--foreground)]/60 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealItem>
        </section>

        {/* Tech Stack */}
        <section className="py-16">
          <RevealItem>
            <SectionLabel text="Tech Stack" />
          </RevealItem>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 mt-6">
                {techStack.map((group, i) => (
                <RevealItem key={group.category} delay={i * 80}>
                    <div className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-500 pb-1 border-b border-[var(--border)]">
                        {group.category}
                    </span>
                    <div className="flex flex-col gap-1.5">
                        {group.items.map((item, j) => (
                        <RevealItem key={item} delay={i * 80 + j * 50}>
                            <span className="text-xs px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--accent)]/5 text-[var(--foreground)]/80 w-fit  whitespace-nowrap">
                            {item}
                            </span>
                        </RevealItem>
                        ))}
                    </div>
                    </div>
                </RevealItem>
                ))}
            </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <RevealItem>
            <SectionLabel text="Features" />
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {features.map((feature, i) => (
              <RevealItem key={feature.title} delay={i * 80}>
                <div className="p-5 rounded border border-[var(--border)] bg-[var(--accent)]/5 hover:border-emerald-400 transition-colors duration-200">
                  <p className="text-sm font-medium mb-1">{feature.title}</p>
                  <p className="text-xs text-[var(--foreground)]/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}