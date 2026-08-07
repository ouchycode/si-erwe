"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Paginated } from "@/lib/types";

export function Pagination({
  meta,
  onPageChange,
}: {
  meta: Paginated<unknown>["meta"];
  onPageChange: (page: number) => void;
}) {
  const { current_page: current, last_page: last } = meta;

  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <p className="text-xs text-muted-foreground">
        Halaman {current} dari {last}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={current <= 1}
          onClick={() => onPageChange(current - 1)}
        >
          <ChevronLeft className="size-3.5" />
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={current >= last}
          onClick={() => onPageChange(current + 1)}
        >
          Berikutnya
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
