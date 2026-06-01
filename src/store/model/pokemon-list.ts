import type { TNamedAPIResource } from './common';

export interface IAPIResourceList {
  count: number;
  next: string;
  previous: string | null;
  results: TNamedAPIResource[];
}
