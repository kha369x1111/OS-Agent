export default function HudFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      {/* corner brackets */}
      <span className="absolute left-[14px] top-[14px] h-[26px] w-[26px] border-l border-t border-[rgba(34,211,238,0.5)] opacity-60" />
      <span className="absolute right-[14px] top-[14px] h-[26px] w-[26px] border-r border-t border-[rgba(34,211,238,0.5)] opacity-60" />
      <span className="absolute bottom-[14px] left-[14px] h-[26px] w-[26px] border-b border-l border-[rgba(34,211,238,0.5)] opacity-60" />
      <span className="absolute bottom-[14px] right-[14px] h-[26px] w-[26px] border-b border-r border-[rgba(34,211,238,0.5)] opacity-60" />
      {/* side rails */}
      <span
        className="absolute left-[14px] top-[80px] bottom-[80px] w-px max-[820px]:hidden"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.16), transparent)",
        }}
      />
      <span
        className="absolute right-[14px] top-[80px] bottom-[80px] w-px max-[820px]:hidden"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.16), transparent)",
        }}
      />
    </div>
  );
}
