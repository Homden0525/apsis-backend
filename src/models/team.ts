export interface Counter {
  id: string;
  steps: number;
}

export interface Team {
  id: string;
  name: string;
  counters: Counter[];
  totalSteps: number;
}

