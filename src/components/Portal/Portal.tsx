import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from '../../utils/canUseDOM';
import type { IProps } from './types';

import './style/index.scss';

const Portal: React.FC<IProps> = ({
  children,
  nodeId = 'default-portal',
}: IProps): JSX.Element | null => {

  const node: Element | null = useMemo((): Element | null => {
    if (!canUseDOM) return null;
    let element = document.getElementById(nodeId);
    if (element) {
      return element;
    } else {
      element = document.createElement('div');
      element.setAttribute('tabindex', '-1');
      element.setAttribute('class', 'Portal');
      element.setAttribute('id', nodeId);
      document.body.appendChild(element);

      return element;
    }
  }, [nodeId]);
  if (!node) return null;
  return ReactDOM.createPortal(children, node);
};

export default Portal;
