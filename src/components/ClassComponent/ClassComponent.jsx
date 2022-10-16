import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNum: '',
    randomNum: Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
  };

  changeVisibility = (sid) => {
    const elem = document.getElementById(sid);
    let typedisp = window.getComputedStyle(elem, null).display;
    typedisp = typedisp === 'none' ? 'flex' : 'none';
    elem.style.display = typedisp;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNum) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNum > state.randomNum) {
        return {
          result: `${state.userNum} больше загаданного`,
        };
      }

      if (state.userNum < state.randomNum) {
        return {
          result: `${state.userNum} меньше загаданного`,
        };
      }

      this.changeVisibility('form');
      this.changeVisibility('game');
      return {
        result: `Вы угадали, это число ${state.userNum},
        попыток ${state.count}`,
      };
    });

    this.setState(() => ({
      userNum: '',
    }));
  };

  handleChange = e => {
    this.setState((state, props) => ({
      userNum: e.target.value,
    }), () => {
      console.log(this.state);
    });
  };

  startNewGame = () => {
    this.changeVisibility('form');
    this.changeVisibility('game');
    this.setState(() => ({
      result: 'Результат',
      count: 0,
      randomNum: Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} id='form' onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNum}/>

          <button className={style.btn}>Угадать</button>
        </form>
        <button className={style.btn} id='game' style={{display: 'none'}}
          onClick={this.startNewGame}>
          Сыграть ещё
        </button>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
