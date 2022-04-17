export type TResourceId = {
  /**
   * The identifier for this resource.
   */
  id: number;
};

export type TResourceURI = {
  url: string;
};

export type TResourceName = {
  /**
   * The name for this resource.
   */
  name: string;
};

export type TNamedAPIResource = TResourceURI & TResourceName;

export type TPath = string;
