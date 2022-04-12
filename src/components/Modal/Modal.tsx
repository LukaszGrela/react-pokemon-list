import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Portal from '../Portal/Portal';
import type { IProps } from './types';
import { getCSSVar } from '../../utils/getCSSVar';
import { getCSSTimeUnit } from '../../utils/getCSSTimeUnit';

import './style/index.scss';

class Modal extends React.Component<IProps> {
  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    console.log('Modal.onKeyDown', event);

    if (event.keyCode === 27) {
      this.props.closeModal();
    }
  };
  render() {
    const {
      isOpen = false,
      modalTransitionTimeout = getCSSTimeUnit(getCSSVar('transition-time'), 0),
      modalId = 'default-modal-id',
      disableOverlay = false,
    } = this.props;

    return (
      <Portal nodeId="modal-portal">
        {this.props.children && !disableOverlay && (
          <TransitionGroup component={null}>
            {isOpen && (
              <CSSTransition
                key={'overlay'}
                classNames="Modal_overlay_transition"
                timeout={
                  this.props.overlayTransitionTimeout != null
                    ? this.props.overlayTransitionTimeout
                    : modalTransitionTimeout
                }
              >
                <div
                  className={`Modal_overlay${this.props.overlayClassName
                    ? ` ${this.props.overlayClassName}`
                    : ''
                    }`}
                  onClick={(): void => this.props.closeModal()}
                  onKeyDown={this.onKeyDown}
                  role="button"
                  tabIndex={-1}
                ></div>
              </CSSTransition>
            )}
          </TransitionGroup>
        )}
        <TransitionGroup component={null}>
          {isOpen && (
            <CSSTransition
              key={'modal'}
              classNames="Modal_transition"
              timeout={modalTransitionTimeout}
            >
              <div className="Modal">
                <div
                  className={`Modal_inner${this.props.className ? ` ${this.props.className}` : ''
                    }`}
                  aria-modal="true"
                  role="dialog"
                  aria-labelledby={`modal-${modalId}-title`}
                  onKeyDown={this.onKeyDown}
                >
                  {this.props.children}
                </div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </Portal>
    );
  }
}

export default Modal;
