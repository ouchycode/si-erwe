import { cache } from "react";
import { api } from "@/lib/api";
import type { SettingGroups } from "@/lib/types";

export const getSettings = cache(async (): Promise<SettingGroups> => {
  try {
    const res = await api.get<{ data: SettingGroups }>("/settings");
    return res.data ?? {};
  } catch {
    return {};
  }
});

let clientSettingsPromise: Promise<SettingGroups> | null = null;

export function getSettingsClient(force = false): Promise<SettingGroups> {
  if (force || !clientSettingsPromise) {
    clientSettingsPromise = getSettings();
  }
  return clientSettingsPromise;
}

export function getGroup<T>(
  settings: SettingGroups,
  group: string,
  key: string
): T | undefined {
  return settings[group]?.[key] as T | undefined;
}
