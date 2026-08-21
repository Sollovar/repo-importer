import { motion } from "motion/react";
import { Globe, ShieldCheck, TrendingUp, Code2 } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    icon: Globe,
    title: "Universal Access",
    body: "One account. Unlock every market — spot, perps, and on-chain venues from a single terminal.",
  },
  {
    icon: ShieldCheck,
    title: "Native Privacy",
    body: "Read-only API keys, per-desk scopes, and signed audit trails keep your flow visible only to you.",
  },
  {
    icon: TrendingUp,
    title: "Capital Efficiency",
    body: "Cross-margin aware routing that sizes fills against live depth, not stale averages.",
  },
  {
    icon: Code2,
    title: "Open Composability",
    body: "Built to be built on. Stream normalized books via WebSocket or REST into your own systems.",
  },
];

function OrderBookMockup() {
  const tabs = ["Chart", "Order book", "Trades", "Depth", "Details"];
  const rows = [
    { bidSize: "1.131", bidPrice: "79,863.2", askPrice: "79,863.3", askSize: "0.002" },
    { bidSize: "1.956", bidPrice: "79,863.1", askPrice: "79,868.2", askSize: "0.052" },
    { bidSize: "1.952", bidPrice: "79,862.1", askPrice: "79,870.4", askSize: "0.053" },
    { bidSize: "7.678", bidPrice: "79,862.3", askPrice: "79,871.4", askSize: "0.055" },
    { bidSize: "2.412", bidPrice: "79,861.2", askPrice: "79,871.9", askSize: "0.057" },
    { bidSize: "5.131", bidPrice: "79,860.5", askPrice: "79,872.1", askSize: "0.061" },
  ];

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/40 bg-card/60 p-4 shadow-2xl">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border/40 pb-3">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={`rounded-md px-2.5 py-1 text-[10px] font-medium tracking-wide ${
              tab === "Order book"
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>0.1 ▾</span>
          <span>BTC ▾</span>
        </span>
      </div>

      {/* Header */}
      <div className="mt-3 grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Size (BTC)</span>
        <span className="text-right">Price (USDT)</span>
        <span className="text-left">Price (USD)</span>
        <span className="text-right">Size (BTC)</span>
      </div>

      {/* Rows */}
      <div className="mt-2 space-y-1">
        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 text-[11px] tabular"
          >
            <span className="text-muted-foreground">{row.bidSize}</span>
            <span className="text-right text-bid">{row.bidPrice}</span>
            <span className="text-left text-ask">{row.askPrice}</span>
            <span className="text-right text-muted-foreground">{row.askSize}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureIcon({ icon: Icon }: { icon: typeof Globe }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm">
      <div className="absolute inset-0 rounded-xl border border-bronze/25 bg-gradient-to-br from-bronze/25 via-bronze/10 to-transparent" />
      <Icon className="relative z-10 h-5 w-5 text-bronze" strokeWidth={1.8} />
    </div>
  );
}

export function WhyVellum() {
  return (
    <section className="dark relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-bronze/10 blur-[100px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why Vellum
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            A terminal built for traders who read the book first.
          </p>
        </motion.div>

        {/* Content stack */}
        <div className="relative mt-16">
          {/* Background order book mockup */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -top-8 flex justify-center opacity-20"
          >
            <OrderBookMockup />
          </div>

          {/* Foreground features */}
          <div className="relative z-10 mx-auto grid max-w-md gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-md"
              >
                <FeatureIcon icon={feature.icon} />
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
