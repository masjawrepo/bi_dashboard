// types/widget.ts

export type ChartType =
  | "bar"
  | "line"
  | "kpi";

export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WidgetConfig {
  id?: string;
  dashboardId?: string;
  queryId: string;
  chartType: ChartType;
  position: WidgetPosition;
}
