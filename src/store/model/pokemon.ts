export interface IAPIResource {
  url: string;
}
export interface INamedAPIResource extends IAPIResource {
  name: string;
}

export interface IAPIResourceList {
  count: number;
  next: string;
  previous: string | null;
  results: INamedAPIResource[];
}
