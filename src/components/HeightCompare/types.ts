export type TPathToPokemonPNG = string;
export interface IProps {
  src: TPathToPokemonPNG;

  /**
   * Base height that incoming height is compared to (human)
   */
  baseHeight: number;
  /**
   * Incoming height to compare (pokemon)
   */
  height: number;

  title?: string;
}