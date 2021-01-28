import { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  render() {
    const { onLoadMore } = this.props;

    return (
      <button
        data-action="loadMore"
        type="button"
        className={s.Button}
        onClick={onLoadMore}
      >
        Load more
      </button>
    );
  }
}
