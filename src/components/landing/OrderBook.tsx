import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Level = { id: string; price: number; size: number; total: number };

const MID = 67420.5;

// deterministic so SSR and client markup match
function seed(side: "bid" | "ask"): Level[] {
  const base = side === "bid" ? [2.4, 1.1, 3.05, 0.72, 1.86, 2.63, 1.34, 0.95] : [1.72, 2.85, 0.88, 2.14, 1.29, 3.1, 0.64, 2.02];
  return base.map((size, i) => {
    const price = side === "bid" ? MID - (i + 1) * 3.5 : MID + (i + 1) * 3.5;
    return { id: `${side}-${i}`, price, size, total: 0 };
  });
}

function withTotals(levels: Level[]) {
  let running = 0;
  return levels.map((l) => {
    running += l.size;
    return { ...l, total: running };
  });
}

export function OrderBook() {
  const [bids, setBids] = useState(() => withTotals(seed("bid")));
  const [asks, setAsks] = useState(() => withTotals(seed("ask")));
  const [last, setLast] = useState(MID);
  const [dir, setDir] = useState<"up" | "down">("up");
  const tick = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      tick.current += 1;
      const jitter = (arr: Level[]) =>
        withTotals(
          arr.map((l) => ({
            ...l,
            size: Math.max(0.15, l.size + (Math.random() - 0.5) * 0.9),
          })),
        );
      setBids(jitter);
      setAsks(jitter);
      const delta = (Math.random() - 0.48) * 9;
      setLast((p) => {
        const next = p + delta;
        setDir(delta >= 0 ? "up" : "down");
        return next;
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  const max = Math.max(...bids.map((b) => b.total), ...asks.map((a) => a.total));

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="glass-cream w-full rounded-3xl p-4 sm:p-6"
      style={{ perspective: 1200 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-ring absolute inset-0 rounded-full bg-bid/60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-bid" />
          </span>
          <span className="text-sm font-semibold tracking-tight">BTC / USDT</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Live
          </span>
        </div>
        <div className="text-right">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={last.toFixed(2)}
              initial={{ opacity: 0, y: dir === "up" ? 10 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir === "up" ? -10 : 10, position: "absolute" }}
              transition={{ duration: 0.35 }}
              className={`tabular text-lg font-semibold ${dir === "up" ? "text-bid" : "text-ask"}`}
            >
              {last.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-3 pb-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      <Side levels={[...asks].reverse()} side="ask" max={max} />

      <div className="my-2 flex items-center justify-between rounded-xl bg-secondary/70 px-3 py-2">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Spread
        </span>
        <span className="tabular text-xs font-semibold">7.00 · 0.01%</span>
      </div>

      <Side levels={bids} side="bid" max={max} />
    </motion.div>
  );
}

function Side({ levels, side, max }: { levels: Level[]; side: "bid" | "ask"; max: number }) {
  return (
    <div className="space-y-[3px]">
      {levels.map((l, i) => (
        <motion.div
          key={l.id}
          initial={{ opacity: 0, x: side === "bid" ? -14 : 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 + i * 0.04, duration: 0.5 }}
          className="relative grid grid-cols-3 items-center overflow-hidden rounded-md px-2 py-[5px] text-xs"
        >
          <motion.span
            aria-hidden
            className={`absolute inset-y-0 right-0 ${side === "bid" ? "bg-bid/12" : "bg-ask/12"}`}
            animate={{ width: `${(l.total / max) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <span
            className={`tabular relative font-medium ${side === "bid" ? "text-bid" : "text-ask"}`}
          >
            {l.price.toFixed(2)}
          </span>
          <motion.span
            key={l.size.toFixed(3)}
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 1 }}
            className="tabular relative text-right text-foreground/80"
          >
            {l.size.toFixed(3)}
          </motion.span>
          <span className="tabular relative text-right text-muted-foreground">
            {l.total.toFixed(2)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
