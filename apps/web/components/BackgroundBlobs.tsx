export function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute w-125 h-125 bg-primary/20 blur-[100px] rounded-full -top-32 -left-32 animate-[drift_8s_ease-in-out_infinite_alternate]" />

      <div className="absolute w-100 h-100 bg-pink-500/20 blur-[100px] rounded-full bottom-0 -right-16 animate-[drift_10s_ease-in-out_infinite_alternate-reverse]" />

      <div className="absolute w-75 h-75 bg-green-400/10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[drift_12s_ease-in-out_infinite_alternate]" />
    </div>
  );
}
