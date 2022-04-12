import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Portal from '../Portal/Portal';
import type { IProps } from './types';
import { getCSSVar } from '../../utils/getCSSVar';
import { getCSSTimeUnit } from '../../utils/getCSSTimeUnit';
import { ECloseModalEnum } from './enums';
import { canUseDOM } from '../../utils/canUseDOM';

import './style/index.scss';

const Modal: React.FC<IProps> = (props: IProps): JSX.Element => {
  const {
    children,
    isOpen = false,
    overlayClassName,
    overlayTransitionTimeout,
    closeModal, className,
    modalTransitionTimeout = getCSSTimeUnit(getCSSVar('transition-time'), 0),
    modalId = 'default-modal-id',
    disableOverlay = false,

  } = props;

  const onKeyDown = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      closeModal(ECloseModalEnum.DISMISSED);
    }
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    } else {
      window.removeEventListener('keydown', onKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])


  const [htmlClassName, setHtmlClassName] = useState<'modal-opened' | undefined>(undefined)
  useLayoutEffect(() => {
    if (canUseDOM) {
      if (htmlClassName) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove('modal-opened')
      }
    }
    return () => {
      if (canUseDOM) {
        document.documentElement.classList.remove('modal-opened')
      }
    }
  }, [htmlClassName]);

  return (
    <Portal nodeId="modal-portal">
      {
        children && !disableOverlay && (
          <TransitionGroup component={null}>
            {isOpen && (
              <CSSTransition
                key={'overlay'}
                classNames="Modal_overlay_transition"
                timeout={
                  overlayTransitionTimeout != null
                    ? overlayTransitionTimeout
                    : modalTransitionTimeout
                }

                mountOnEnter
                unmountOnExit
              >
                <div
                  className={`Modal_overlay${overlayClassName
                    ? ` ${overlayClassName}`
                    : ''
                    }`}
                  onClick={(): void => closeModal(ECloseModalEnum.DISMISSED)}
                  role="button"
                  tabIndex={-1}
                ></div>
              </CSSTransition>
            )}
          </TransitionGroup>
        )
      }
      <TransitionGroup component={null} >
        {isOpen && (
          <CSSTransition
            key={'modal'}
            classNames="Modal_transition"
            timeout={modalTransitionTimeout}
            onEnter={() => {

              setHtmlClassName('modal-opened')
            }}

            onExited={() => {
              setHtmlClassName(undefined)
            }}

            mountOnEnter
            unmountOnExit

          >
            <div className="Modal">
              <div
                className={`Modal_inner${className ? ` ${className}` : ''
                  }`}
                aria-modal="true"
                role="dialog"
                aria-labelledby={`modal-${modalId}-title`}
              >
                {children}
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup >
    </Portal >
  );

}
export default Modal;
