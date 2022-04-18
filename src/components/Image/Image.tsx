import React, { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import { IProps } from './types';
import './style/index.scss';

const Image: React.FC<IProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  onError,
  onLoaded,
}): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [hasErrors, setHasErrors] = React.useState(false);
  useEffect(() => {
    setLoading(true);
  }, [src]);

  const handleError = React.useCallback<
    React.ReactEventHandler<HTMLImageElement>
  >(
    (e) => {
      if (!hasErrors) {
        onError?.({ message: 'Failed to load image' });
      } else {
        onError?.({ message: 'Failed to load fallback image' });
      }
      if (fallbackSrc && !hasErrors) {
        setHasErrors(true);
        e.currentTarget.src = fallbackSrc;
      }
    },
    [fallbackSrc, hasErrors, onError]
  );

  return (
    <span className={`Image${className ? ` ${className}` : ''}`}>
      <img
        className={`Image_img${loading ? ' loading' : ''}`}
        src={src}
        alt={alt}
        onError={handleError}
        aria-hidden={!alt}
        onLoad={() => {
          onLoaded?.(hasErrors);
          setLoading(false);
        }}
      />
      {loading && <Spinner />}
    </span>
  );
};

export default Image;
