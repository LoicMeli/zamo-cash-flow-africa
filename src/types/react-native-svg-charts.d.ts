declare module 'react-native-svg-charts' {
  import { ComponentType, ReactNode } from 'react';
  import { ViewStyle } from 'react-native';
  
  export interface PieChartData {
    value: number;
    amount?: number;
    key?: string;
    svg?: {
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
      [key: string]: any;
    };
    arc?: {
      outerRadius?: string | number | any;
      padAngle?: number;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface PieSliceData {
    slices: Array<{
      pieCentroid: [number, number];
      labelCentroid: [number, number];
      data: PieChartData;
      index: number;
    }>;
  }

  export interface PieChartProps {
    style?: ViewStyle;
    data: PieChartData[];
    innerRadius?: string | number;
    outerRadius?: string | number;
    padAngle?: number;
    animate?: boolean;
    animationDuration?: number;
    children?: ReactNode | ((data: PieSliceData) => ReactNode);
    [key: string]: any;
  }

  export interface Slice {
    pieCentroid: [number, number];
    labelCentroid: [number, number];
    data: PieChartData;
    index: number;
    [key: string]: any;
  }

  export interface PieChartLabelProps {
    slices: Slice[];
  }

  export const PieChart: ComponentType<PieChartProps>;
  export const BarChart: ComponentType<any>;
  export const LineChart: ComponentType<any>;
  export const AreaChart: ComponentType<any>;
} 