// types/dashboard.ts

import { WidgetConfig } from "./widget";

export interface DashboardConfig {
  id?: string;
  name: string;
  widgets: WidgetConfig[];
  createdAt?: string;
}
