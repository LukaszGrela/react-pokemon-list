import { TRGB } from "../../utils/colors";

export type TPathToPNG = string;
export interface IProps {
  src: TPathToPNG;
  color?: TRGB;
  onError?: (error: unknown) => void;
}