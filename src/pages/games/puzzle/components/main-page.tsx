import React, {
  useEffect, useContext, useState
} from 'react';
import getPhrase from '../ts/api.phrase';
import { Game } from '../ts/Game';
import '../dragHandler';
import { PuzzleContext } from '../context';
import ImgAndWords from './main-page.img-and-words';
import AssembledGamePuzzle from './main-page.assembled-puzzle';
import Img from './main-page.img';
import Prompts from './main-page.prompt';
import { StatisticsContext } from '../../../../statistics/statisticsProvider';
import { StatisticsInterface } from '../../../../types';
import { getManyWordsById } from '../../../../backend/words';

const MainPage = () => {
  const { state, dispatch } = useContext(PuzzleContext);
  const { level, page, data } = state;
  const statistics = useContext(StatisticsContext) as StatisticsInterface;
  const [isInterval, setIsInterval] = useState<any>(state.isInterval);
  const [isLevel, setIsLevel] = useState<any>(state.isLevel);

  useEffect(() => {
    async function phrase() {
      const response = await getPhrase(level, page);
      const result = await getManyWordsById(statistics.getAllWordsId());

      if (result.content.length && response) {
        dispatch({ type: 'set asyncLevel', value: new Game(response) });

        const game = new Game(result.content);

        if (game.sentences.length < 11) {
          dispatch({ type: 'set asyncInterval', value: game });
          if (state.isLevel) {
            setIsInterval(false);
            setIsLevel(true);
            dispatch({ type: 'set data', value: new Game(response) });
          } else {
            setIsInterval(true);
            setIsLevel(false);
            dispatch({ type: 'set data', value: game });
          }
        } else {
          setIsInterval(false);
          setIsLevel(true);
          dispatch({ type: 'set data', value: new Game(response) });
        }
      } else {
        setIsInterval(false);
        setIsLevel(true);
        dispatch({ type: 'set data', value: new Game(response) });
      }
    }
    phrase();
  }, [level, page]);

  function handleChangeLevel(e: { target: HTMLSelectElement; }) {
    const { target } = e;
    dispatch({ type: 'set level', value: target.value });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  function handleChangePage(e: { target: HTMLSelectElement; }) {
    const { target } = e;
    dispatch({ type: 'set page', value: target.value });
    dispatch({ type: 'set data', value: null });
    dispatch({ type: 'set mode', value: 'image and words' });
  }

  return (
    <div className="main-page">
      <nav className="main-page-nav">
        {isInterval && (
          <>
            <button
              type="button"
              className="on-level-page"
              onClick={() => {
                dispatch({ type: 'set data', value: state.asyncLevel });
                dispatch({ type: 'set mode', value: 'image and words' });
                dispatch({ type: 'set is interval', value: false });
                dispatch({ type: 'set is level', value: true });
                setIsInterval(false);
                setIsLevel(true);
              }}
            >
              Уровень: №. Страница: №.
            </button>
            <h3 className="interval-game">Интервал</h3>
          </>
        )}
        {isLevel && (
        <>
          <button
            type="button"
            className="on-level-page"
            onClick={() => {
              if (state.asyncInterval.sentences && state.asyncInterval.sentences.length < 11) {
                dispatch({ type: 'set data', value: state.asyncInterval });
                dispatch({ type: 'set mode', value: 'image and words' });
                dispatch({ type: 'set is interval', value: true });
                dispatch({ type: 'set is level', value: false });
                setIsInterval(true);
                setIsLevel(false);
              }
            }}
          >
            Интервал
          </button>
          <div className="wrapper-level">
            <label htmlFor="level">
              Уровень:
              <select
                id="level"
                onChange={handleChangeLevel}
                className="select-level"
                value={level}
              >
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
              </select>
            </label>
          </div>
          <div className="wrapper-level-page">
            <label htmlFor="level-page">
              Страница:
              <select
                id="level-page"
                onChange={handleChangePage}
                className="select-level-page"
                value={page}
              >
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
                <option value="4">5</option>
                <option value="5">6</option>
                <option value="6">7</option>
                <option value="7">8</option>
                <option value="8">9</option>
                <option value="9">10</option>
                <option value="10">11</option>
                <option value="11">12</option>
                <option value="12">13</option>
                <option value="13">14</option>
                <option value="14">15</option>
                <option value="15">16</option>
                <option value="16">17</option>
                <option value="17">18</option>
                <option value="18">19</option>
                <option value="19">20</option>
                <option value="20">21</option>
                <option value="21">22</option>
                <option value="22">23</option>
                <option value="23">24</option>
                <option value="24">25</option>
                <option value="25">26</option>
                <option value="26">27</option>
                <option value="27">28</option>
                <option value="28">29</option>
                <option value="29">30</option>
              </select>
            </label>
          </div>
        </>
        )}
        <Prompts />
      </nav>
      { state.mode === 'image and words' && <ImgAndWords data={data} /> }
      { state.mode === 'assembled-puzzle' && <AssembledGamePuzzle data={data} /> }
      { state.mode === 'image' && <Img /> }
    </div>
  );
};

export default MainPage;
