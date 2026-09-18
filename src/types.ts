export type ActiveTab = 'overview' | 'seasonality' | 'ai-predictor' | 'filters-segment';

export type HotelTypeFilter = 'all' | 'city' | 'resort';

export type YearFilter = 'all' | 2015 | 2016 | 2017;

export interface KpiSummary {
  totalBookings: number;
  totalBookingsYoy: string;
  confirmedStays: number;
  confirmedPercentage: string;
  cancellationRate: string;
  cancellationDiff: string;
  leadTimeDays: number;
}

export interface SimulationParams {
  hotelType: 'city' | 'resort';
  month: string;
  leadTime: number;
  marketSegment: 'Online TA' | 'Direct / Web' | 'Corporate' | 'Tour Groups';
  deposit: 'No Deposit' | 'Non Refund';
  isRepeatGuest: boolean;
  adults: number;
  children: number;
  objective: 'cancel' | 'extended';
}

export interface PredictionResult {
  score: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskLabel: string;
  keyDrivers: { label: string; impact: string; percentage: number; isNegative: boolean }[];
  advice: string;
}
