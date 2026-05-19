import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col items-center justify-center p-6 relative font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* Structural Accent Lines */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-indigo-500 z-50"></div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size[4rem_4rem] z-0"></div>

      <div className="max-w-md w-full relative z-10 text-center space-y-8">
        
        {/* Brand Header */}
        <div className="font-mono font-bold tracking-tight text-xl flex items-center justify-center gap-1.5">
          <span className="text-emerald-500">⌘</span>
          neche<span className="text-emerald-500">.dev</span>
        </div>

        {/* Terminal Card Display */}
        <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 p-6 text-left shadow-xs backdrop-blur-md">
          {/* Mac-style Window Controls */}
          <div className="flex items-center gap-1.5 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 ml-2">bash — 404 session</span>
          </div>

          {/* Terminal Command Output */}
          <div className="font-mono text-sm space-y-3 leading-relaxed">
            <p className="text-zinc-500 dark:text-zinc-400">
              <span className="text-emerald-500">guest@neche.dev</span>:<span className="text-indigo-400">~</span>$ cd /page-not-found
            </p>
            <p className="text-rose-500 dark:text-rose-400 font-semibold">
              bash: cd: /page-not-found: No such file or directory (Error 404)
            </p>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs border-t border-zinc-200/30 dark:border-zinc-800/30 pt-3">
              The requested resource could not be loaded. Either the route was moved, renamed, or it never existed in this project namespace.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-wider uppercase font-mono font-semibold px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-emerald-500 dark:hover:bg-emerald-400 dark:hover:text-zinc-950 hover:text-zinc-950 transition-all shadow-sm"
          >
            <span>cd /home</span>
            <span className="text-emerald-500 font-bold">➔</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
