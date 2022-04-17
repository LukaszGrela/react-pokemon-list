import React from 'react';
import { IProps } from './types';

const Image: React.FC<IProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
}): JSX.Element => {
  const [hasErrors, setHasErrors] = React.useState(false);
  const handleError = React.useCallback<
    React.ReactEventHandler<HTMLImageElement>
  >(
    (e) => {
      if (fallbackSrc && !hasErrors) {
        setHasErrors(true);
        e.currentTarget.src = fallbackSrc;
      }
    },
    [fallbackSrc, hasErrors]
  );
  return (
    <img
      src={src}
      alt={alt}
      className={`Image${className ? ` ${className}` : ''}`}
      onError={handleError}
      aria-hidden={!alt}
    />
  );
};

export default Image;
