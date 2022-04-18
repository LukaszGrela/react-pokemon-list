export interface IProps {
  src: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;

  onError?: (error: { message: string }) => void;
  onLoaded?: (fallback?: boolean) => void;
}
