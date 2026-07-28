"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";

export function useRealtimeVillages(onChange: () => void) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel("villages-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "villages" },
        () => {
          onChange();
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [onChange]);
}

export function useRealtimeOffres(onChange: () => void) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel("offres-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "offres" },
        () => {
          onChange();
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [onChange]);
}
