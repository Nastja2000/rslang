import React, { useState, useEffect, useContext } from 'react';
import { isDisabledText, isDisabledAudio } from '../ts/isDisabled';
import { PuzzleContext } from '../context';
import getTimeDate from '../ts/getTimeDay';
import storage from '../ts/storage';
import userStorage from '../ts/storage.user';

function GameRounds(props: any) {
  const { dispatch } = useContext(PuzzleContext);
  const { data } = props;
  const { childrenPuzzle } = props;
  const { assembledDOM } = props;
  userStorage({ level: data.level, page: data.page, action: 'set' });
  const [sentenceNumber, setSentenceNumber] = useState(0);

  const { puzzleChld, removePuzzleClds } = childrenPuzzle[sentenceNumber];

  const [visibleDontKnow, setVisibleDontKnow] = useState(true);
  const [visibleContinue, setVisibleContinue] = useState(false);
  const [knowledge, setKnowledge] = useState<any>({ know: [], dontknow: [] });
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Array.from(assembledDOM.current.children).forEach((sentence: any) => {
      sentence.classList.remove('opacity-full', 'event-none-opacity-full');
    });

    const isDisabled = document.querySelector('.image-card-prompt')?.classList.contains('disabled');
    const puzzleCards = document.querySelectorAll('.assembled-word-game-puzzle');
    if (isDisabled) {
      puzzleCards.forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle}background: darkslategray;`);
      });
    }

    const y = window.scrollY;
    window.scrollTo({ top: 0 });
    const bound = assembledDOM.current.children[sentenceNumber].getBoundingClientRect();
    setHeight(bound.bottom);
    window.scrollTo({ top: y });

    assembledDOM.current.children[sentenceNumber].classList.add('opacity-full');

    function updateSize() {
      const { scrollY } = window;
      window.scrollTo({ top: 0 });
      const { bottom } = assembledDOM.current.children[sentenceNumber].getBoundingClientRect();
      setHeight(bottom);
      window.scrollTo({ top: scrollY });
    }

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  const classAudio = isDisabledAudio();
  const pronunciationAudio = React.createElement('div', {
    className: classAudio,
    title: 'pronunciation audio',
    onClick: () => { data.sentences[sentenceNumber].audio.play(); }
  });

  const classText = isDisabledText();
  const pronunciationText = React.createElement('div', {
    className: classText,
    title: 'pronunciation text'
  }, data.sentences[sentenceNumber].textExampleTranslate);

  const wrapperAutoPronunciation = React.createElement('div', {
    className: 'wrapper-auto-pronunciation'
  }, pronunciationAudio, pronunciationText);

  function handleDontKnowButton() {
    const isDisabled = document.querySelector('.volume-prompt')?.classList.contains('disabled');
    if (!isDisabled) {
      data.sentences[sentenceNumber].audio.play();
    }

    const { dontknow } = knowledge;
    dontknow.push({
      audio: data.sentences[sentenceNumber].audio,
      sentence: data.sentences[sentenceNumber].sentenceText,
      knowledge: false
    });

    const rounds = document.querySelector('.game-round-words');
    Array.from(assembledDOM.current.children[sentenceNumber].children)
      .forEach((el: any, index: number) => {
        if (el.children.length && rounds) {
          rounds.append(el.children[0]);
        }
        el.textContent = data.sentences[sentenceNumber].words[index];
      });
    removePuzzleClds();

    setVisibleDontKnow(!visibleDontKnow);
    setVisibleContinue(!visibleContinue);
  }

  function handleContinueButton() {
    if (sentenceNumber < 9) {
      setSentenceNumber(sentenceNumber + 1);
      setVisibleDontKnow(!visibleDontKnow);
      setVisibleContinue(!visibleContinue);
    } else if (sentenceNumber === 9) {
      const interval = document.querySelector('.interval-game');
      let LandP;
      if (interval) {
        LandP = 'Interval';
      } else {
        LandP = `Level: ${data.level + 1}. Page: ${data.page + 1}`;
      }
      const statistics = {
        time: `${getTimeDate()}`,
        levelandpage: LandP,
        srcimage: `https://raw.githubusercontent.com/mrINEX/english-puzzle/english-puzzle/english-puzzle/src/assets/data_paintings/${data.pageImage.imageSrc}`,
        author: `${data.pageImage.author}`,
        nameyear: `${data.pageImage.name}(${data.pageImage.year})`,
        know: `I know ${knowledge.know.length}`,
        dontknow: `I don't know ${knowledge.dontknow.length}`
      };
      storage(statistics);

      dispatch({ type: 'set knowledge', value: knowledge });
      dispatch({ type: 'set mode', value: 'image' });
    }
  }

  const dontKnowButton = React.createElement('button', {
    className: 'btn game-round-btn dont-know-botton',
    onClick: handleDontKnowButton,
    type: 'button'
  }, 'Не знаю');
  const continueButton = React.createElement('button', {
    className: 'btn game-round-btn continue-botton',
    onClick: handleContinueButton,
    type: 'button'
  }, 'Продолжить');

  const gameRoundControls = React.createElement('div', {
    className: 'game-round-controls'
  }, visibleDontKnow && dontKnowButton,
  visibleContinue && continueButton);

  const GameRoundWords = React.createElement('div', {
    className: 'game-round-words',
    onMouseLeave: () => {
      const rounds = document.querySelector('.game-round-words');
      let countCorrectSentence = 0;
      if (!rounds?.children.length && visibleDontKnow) {
        Array.from(assembledDOM.current.children[sentenceNumber].children)
          .forEach((el: any, index: number) => {
            if (el.children.length && rounds) {
              const keyNest = el.getAttribute('data-key-word');
              const keyPuzzle = el.children[0].getAttribute('data-key-word');
              el.classList.remove('correct-word', 'incorrect-word');
              el.children[0].classList.remove('correct-word', 'incorrect-word');
              if (keyNest === keyPuzzle) {
                countCorrectSentence += 1;
                el.classList.add('correct-word');
                el.children[0].classList.add('correct-word');
              } else {
                el.classList.add('incorrect-word');
                el.children[0].classList.add('incorrect-word');
              }
              el.children[0].classList.remove('absolute');
              rounds.append(el.children[0]);
            }
            el.textContent = data.sentences[sentenceNumber].words[index];
          });
        removePuzzleClds();
        const isNext = countCorrectSentence === assembledDOM.current.children[sentenceNumber].children.length;
        if (isNext) {
          data.sentences[sentenceNumber].audio.play();
          const { know } = knowledge;
          know.push({
            audio: data.sentences[sentenceNumber].audio,
            sentence: data.sentences[sentenceNumber].sentenceText,
            knowledge: true
          });
          setVisibleDontKnow(!visibleDontKnow);
          setVisibleContinue(!visibleContinue);
        }
      }
    }
  }, puzzleChld);

  const wrapperGameRound = React.createElement('div', {
    className: 'wrapper-game-round',
    style: {
      top: `${height}px`
    }
  }, GameRoundWords, gameRoundControls);

  return (
    <>
      { wrapperAutoPronunciation }
      { wrapperGameRound }
    </>
  );
}

export default GameRounds;
