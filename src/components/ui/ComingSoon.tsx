import { Construction } from "lucide-react";

export default function ComingSoon({ message = "កំពុងរៀបចំ" }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-amber-200 opacity-50" />
          <div className="relative rounded-full bg-gradient-to-br from-amber-50 to-amber-100 p-5 shadow-inner">
            <Construction size={44} className="text-amber-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-700">{message}</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            ទំព័រនេះកំពុងស្ថិតក្នុងការអភិវឌ្ឍ សូមរង់ចាំ
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-amber-400 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
