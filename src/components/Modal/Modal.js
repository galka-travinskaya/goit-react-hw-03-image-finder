import React, { Component } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  onCloseOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onToggleModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.onCloseOverlay}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
