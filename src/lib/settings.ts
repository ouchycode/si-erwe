import { api } from "@/lib/api";
import type { SettingGroups } from "@/lib/types";

export async function getSettings(): Promise<SettingGroups> {
  try {
    const res = await api.get<{ data: SettingGroups }>("/settings");
    return res.data ?? {};
  } catch {
    return {};
  }
}

export function getGroup<T>(
  settings: SettingGroups,
  group: string,
  key: string
): T | undefined {
  return settings[group]?.[key] as T | undefined;
}
