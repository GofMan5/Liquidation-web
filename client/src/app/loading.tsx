import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    </div>
  );
}
