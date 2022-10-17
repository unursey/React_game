import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    isGameOver: true,
    result: `Введите число от ${this.props.min} до ${this.props.max}`,
    userNum: '',
    randomNum: Math.floor(Math.random() *
    (this.props.max - this.props.min + 1)) + this.props.min,
    count: 0,
  };

  // changeVisibility = (sid) => {
  //   const elem = document.getElementById(sid);
  //   let typedisp = window.getComputedStyle(elem, null).display;
  //   typedisp = typedisp === 'none' ? 'flex' : 'none';
  //   elem.style.display = typedisp;
  // };

  handleSubmit = () => {
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNum) {
        if (!state.count < 0) {
          return {
            count: 0,
          };
        } else {
          return {
            count: state.count - 1,
          };
        }
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

      return {
        isGameOver: false,
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
    this.setState(() => ({
      isGameOver: true,
      result: `Введите число от ${this.props.min} до ${this.props.max}`,
      count: 0,
      randomNum: Math.floor(Math.random() *
      (this.props.max - this.props.min + 1)) + this.props.min,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} id='form' onSubmit={(e) =>
          e.preventDefault()}>
          {this.state.isGameOver ? (
            <>
              <label className={style.label} htmlFor='user_number'>
                Угадай число
              </label>

              <input className={style.input} type='number' id='user_number'
                onChange={this.handleChange} value={this.state.userNum}/>

              <button className={style.btn} onClick={this.handleSubmit}>
                Угадать
              </button>
            </>
          ) : (
            <button className={style.btn} id='game'
              onClick={this.startNewGame}>
              Сыграть ещё
            </button>
          )}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
