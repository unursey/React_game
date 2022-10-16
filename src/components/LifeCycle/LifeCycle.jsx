import React from 'react';
import style from './LifeCycle.module.css';

export class LifeCycle extends React.Component {
  /**
   * !render
   * constructor
   * getDerivedStateFromProps
   * render
   * -
   * !commit
   * обновляется DOM
   * componentDidMount
   * componentWillUnmount
   */

  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      field: 0,
      hasError: false,
    };

    this.handler = this.handler.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return state;
  }

  componentDidMount() {
    console.log('componentDidMount');

    // setInterval(() => {
    //   this.setState((state) => ({
    //     field: state.field + 1,
    //   }));
    // }, 3000);

    // document.addEventListener('scroll', this.handler);

    // eslint-disable-next-line react/prop-types
    document.title = this.props.prop;
  }

  /**
   * !render
   * getDerivedStateFromProps
   * shouldComponentUpdate
   * -
   * !pre-commit
   * getSnapshotBeforeUpdate
   * обновляется DOM
   * !commit
   * componentDidUpdate
   */

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Принимает новые пропсы, новые состояния и контекст, возвращая boolean
    // НЕ ИСПОЛЬЗОВАТЬ В PURE компоненте
    console.log('shouldComponentUpdate');

    return this.state !== nextState || this.props !== nextProps;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Принимает предыдущие значения, возвращает по умолчанию null
    console.log('getSnapshotBeforeUpdate');
    return window.pageXOffset;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    window.scrollBy(0, -snapshot);
  }

  componentWillUnmount() {
    // document.removeEventListener('scroll', this.handler);
  }

  /**
   * !error
   * getDerivedStateFromError
   * componentDidCatch
   */

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // sendLog(errorInfo.componentStack);
  }

  // UNS методы устарели, не использовать

  handler() {
    this.setState(state => ({field: state.field + 1}));
  }

  render() {
    console.log('render');

    if (this.state.hasError) {
      return <h1 className={style.title}>Ошибка</h1>;
    } else {
      return (
        <div>
          <h1 className={style.title}>Жизненный цикл</h1>

          <div className={style.container}>
            <div>
              <h2 className={style.title}>Типы</h2>
              <ul className={style.list}>
                <li>Монтирование</li>
                <li>Обновление</li>
                <li>Размонтирование</li>
                <li>Ошибки</li>
              </ul>
            </div>

            <div className='stage'>
              <h2 className={style.title}>Этапы</h2>
              <ul className={style.list}>
                <li>Render</li>
                <li>Pre-commit</li>
                <li>Commit</li>
              </ul>
            </div>
          </div>

          <button className={style.btn}
            onClick={this.handler}>
            Клик {this.state.field}</button>
        </div>
      );
    }
  }
}
