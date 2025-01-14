document.body.classList.add('body_game-not-start');

//header
const headerSection = document.createElement('section');
headerSection.classList.add('header');

const headerText = document.createElement('h1');
headerText.classList.add('header__text');
headerText.textContent = 'SIMON SAYS';
headerSection.appendChild(headerText);

document.body.appendChild(headerSection);


//game
const gameSection = document.createElement('section');
gameSection.classList.add('game');

const gameContainerDiv = document.createElement('div');
gameContainerDiv.classList.add('game__container');

//level-and-round div
const optionLine = document.createElement('div');
optionLine.classList.add('game__option-line');

//level-switcher
const levelSwitcherDiv = document.createElement('div');
levelSwitcherDiv.classList.add('game__level-switcher');

//easy
const easyLevelButton = document.createElement('button');
easyLevelButton.classList.add('level-switcher__btn');

const easyLevelButtonText = document.createElement('h3');
easyLevelButtonText.classList.add('level-btn__text');
easyLevelButtonText.textContent = 'easy';

easyLevelButton.appendChild(easyLevelButtonText);

//medium
const mediumLevelButton = document.createElement('button');
mediumLevelButton.classList.add('level-switcher__btn');

const mediumLevelButtonText = document.createElement('h3');
mediumLevelButtonText.classList.add('level-btn__text');
mediumLevelButtonText.textContent = 'medium';

mediumLevelButton.appendChild(mediumLevelButtonText);

//hard
const hardLevelButton = document.createElement('button');
hardLevelButton.classList.add('level-switcher__btn');

const hardLevelButtonText = document.createElement('h3');
hardLevelButtonText.classList.add('level-btn__text');
hardLevelButtonText.textContent = 'hard';

hardLevelButton.appendChild(hardLevelButtonText);

//add level-buttons to div level-switcher
levelSwitcherDiv.appendChild(easyLevelButton);
levelSwitcherDiv.appendChild(mediumLevelButton);
levelSwitcherDiv.appendChild(hardLevelButton);

optionLine.appendChild(levelSwitcherDiv);

//round-counter
const roundCounter = document.createElement('div');
roundCounter.classList.add('game__round-counter');

const roundCounterText = document.createElement('h3');
roundCounterText.classList.add('round-counter__text');
roundCounterText.textContent = 'round: 1/5';

roundCounter.appendChild(roundCounterText);

optionLine.appendChild(roundCounter);

//add div level-and-round to game section
gameContainerDiv.appendChild(optionLine);

//start-button
const startButton = document.createElement('button');
startButton.classList.add('game__start-btn');

const startButtonText = document.createElement('h2');
startButtonText.classList.add('start-btn__text');
startButtonText.textContent = 'START';

startButton.appendChild(startButtonText);
gameContainerDiv.appendChild(startButton);

//input line
const gameInputLine = document.createElement('div');
gameInputLine.classList.add('game__input-line');
const gameInputSpan = document.createElement('span');
gameInputLine.appendChild(gameInputSpan);
gameContainerDiv.appendChild(gameInputLine);

//keyboard
const keyboardDiv = document.createElement('div');
keyboardDiv.classList.add('game__keyboard');

const numbersLine = document.createElement('div');
numbersLine.classList.add('keyboard__number-container');

//number-buttons
for (let i = 1; i <= 10; i++) {
    const numberButton = document.createElement('button');
    numberButton.classList.add('keyboard__btn');
    if (i === 10) {
        i = 0;
    }
    numberButton.dataset.symbol = String(i);
    numberButton.textContent = String(i);
    numbersLine.appendChild(numberButton);
    if (i === 0) {
        i = 10;
    }
}

keyboardDiv.appendChild(numbersLine);

//letter-buttons
const lettersContainer = document.createElement('div');
lettersContainer.classList.add('keyboard__letter-container');

const alphabet = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

alphabet.forEach(line => {
    const lettersLine = document.createElement('div');
    lettersLine.classList.add('keyboard__letter-line');

    line.forEach(letter => {
        const letterButton = document.createElement('button');
        letterButton.classList.add('keyboard__btn');
        letterButton.dataset.symbol = letter;
        letterButton.textContent = letter.toUpperCase();
        lettersLine.appendChild(letterButton);
    });

    lettersContainer.appendChild(lettersLine);
});

keyboardDiv.appendChild(lettersContainer);

gameContainerDiv.appendChild(keyboardDiv);

//button to game process
const processButtonsDiv = document.createElement('div');
processButtonsDiv.classList.add('game__process-btns');

//restart button
const restartButton = document.createElement('button');
restartButton.classList.add('game__restart-btn');

const restartButtonText = document.createElement('h3');
restartButtonText.classList.add('restart-btn__text');
restartButtonText.textContent = 'new game';

restartButton.appendChild(restartButtonText);

//repeat button
const repeatButton = document.createElement('button');
repeatButton.classList.add('game__repeat-btn');

const repeatButtonText = document.createElement('h3');
repeatButtonText.classList.add('repeat-btn__text');
repeatButtonText.textContent = 'repeat the sequence';

repeatButton.appendChild(repeatButtonText);

//add both buttons to div
processButtonsDiv.appendChild(restartButton);
processButtonsDiv.appendChild(repeatButton);

//add div in container
gameContainerDiv.appendChild(processButtonsDiv);

//add all in container
gameSection.appendChild(gameContainerDiv);

//add section game to body
document.body.appendChild(gameSection);


//keyboard change with level
const keyboardLetters = document.querySelector('.keyboard__letter-container');

//default level
easyLevelButton.classList.add('level-switcher__btn_active');


let currentRound = 1;
let isCorrectInput = true;
let repeatButtonClicked = false;
let currentLevel = 'easy';
let currentSequence = [];
let isSimulating = false;
let userSequence = [];
let errorCount = 0;
let gameActive = false;


//change level
function handleLevelChange(level) {
    if (gameActive) return;
    easyLevelButton.classList.remove('level-switcher__btn_active');
    mediumLevelButton.classList.remove('level-switcher__btn_active');
    hardLevelButton.classList.remove('level-switcher__btn_active');

    if (level === 'easy') {
        keyboardLetters.style.display = 'none';
        numbersLine.style.display = 'flex';
        easyLevelButton.classList.add('level-switcher__btn_active');
        currentLevel = 'easy';
    } else if (level === 'medium') {
        keyboardLetters.style.display = 'flex';
        numbersLine.style.display = 'none';
        mediumLevelButton.classList.add('level-switcher__btn_active');
        currentLevel = 'medium';
    } else if (level === 'hard') {
        keyboardLetters.style.display = 'flex';
        numbersLine.style.display = 'flex';
        hardLevelButton.classList.add('level-switcher__btn_active');
        currentLevel = 'hard';
    }
    document.activeElement.blur()
}

//listener level-buttons
easyLevelButton.addEventListener('click', () => handleLevelChange('easy'));
mediumLevelButton.addEventListener('click', () => handleLevelChange('medium'));
hardLevelButton.addEventListener('click', () => handleLevelChange('hard'));

//game start
const gameStartBtn = document.querySelector('.game__start-btn');

//change game board for game process
const levelButtons = document.querySelectorAll('.level-switcher__btn');
const roundCounterElement = document.querySelector('.game__round-counter');
const processBtns = document.querySelector('.game__process-btns');

//click start
gameStartBtn.addEventListener('click', () => {
    gameActive = true;
    gameStartBtn.style.display = 'none';
    gameInputLine.style.display = 'flex';
    levelButtons.forEach(button => {
        if (!button.classList.contains('level-switcher__btn_active')) {
            button.classList.add('level-switcher__btn_disabled');
        }
        button.disabled = true;
        button.style.pointerEvents = 'none';
    });

    roundCounterElement.style.display = 'flex';
    processBtns.style.display = 'flex';

    currentRound = 1;
    isCorrectInput = true;
    repeatButtonClicked = false;
    errorCount = 0;
    roundCounterText.textContent = `round: ${currentRound}/5`;
    currentSequence = generateSequence(currentLevel, currentRound);
    gameInputSpan.textContent = '';
    const keyboardButtons = document.querySelectorAll('.keyboard__btn');
    keyboardButtons.forEach(button => {
        button.classList.add('keyboard_disabled')
    });

    keyboardSimulation(currentSequence);
});

//click new game
restartButton.addEventListener('click', () => {
    gameActive = false;
    gameInputLine.style.display = 'none';
    gameInputSpan.textContent = '';
    gameStartBtn.style.display = 'flex';

    roundCounterElement.style.display = 'none';
    processBtns.style.display = 'none';

    levelButtons.forEach(button => {
        button.classList.remove('level-switcher__btn_disabled');
        button.disabled = false;
        button.style.pointerEvents = '';
    });
    isCorrectInput = true;
    repeatButtonClicked = false;
    errorCount = 0;
    userSequence = [];
    document.body.classList.add('body_game-not-start');
    repeatButtonText.textContent = 'repeat the sequence';
    repeatButton.disabled = false;
    repeatButton.classList.remove('game__repeat-btn_disabled');
    currentRound = 1;
    roundCounterText.textContent = `round: ${currentRound}/5`;
    const keyboardButtons = document.querySelectorAll('.keyboard__btn');
    keyboardButtons.forEach(button => {
        button.classList.remove('keyboard_disabled');
    });
});

//generate sequence
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function generateSequence(level, round) {
    const sequenceLength = 2 + (round - 1) * 2;
    let sequence = [];
    let availableSymbols;

    switch (level) {
        case 'easy':
            availableSymbols = numbers;
            break;
        case 'medium':
            availableSymbols = letters;
            break;
        case 'hard':
            availableSymbols = [...numbers, ...letters];
            break;
        default:
            availableSymbols = numbers;
    }

    for (let i = 0; i < sequenceLength; i++) {
        const randomIndex = Math.floor(Math.random() * availableSymbols.length);
        sequence.push(availableSymbols[randomIndex]);
    }
    return sequence;
}

function classAdd(element) {
    element.classList.add('keyboard__btn_active');
}

function classRemove(element) {
    element.classList.remove('keyboard__btn_active');
}

//simulation input sequence
function keyboardSimulation(sequence) {
    isSimulating = true;
    restartButton.disabled = true;
    repeatButton.disabled = true;
    repeatButton.classList.add('game__repeat-btn_disabled');
     document.body.classList.add('body_game-not-start'); // Добавляем класс здесь
    const keyboardButtons = document.querySelectorAll('.keyboard__btn');
    let delay = 0;
    for (let i = 0; i < sequence.length; i++) {
        const button = Array.from(keyboardButtons).find(btn => btn.dataset.symbol === sequence[i]);

        setTimeout(classAdd, delay, button);
        delay += 500;
        setTimeout(classRemove, delay, button);
        delay += 200;

        if (i === sequence.length - 1) {
            setTimeout(() => {
                document.body.classList.remove('body_game-not-start');
                isSimulating = false;
                keyboardButtons.forEach(button => {
                    button.classList.remove('keyboard_disabled');
                });
                restartButton.disabled = false;
                if (!repeatButtonClicked) {
                    repeatButton.disabled = false;
                }
                repeatButton.classList.remove('game__repeat-btn_disabled');
            }, delay);
            setTimeout(() => {
                keyboardButtons.forEach(button => {
                    button.classList.remove('keyboard__btn_active');
                });
            }, delay + 200);
        }
    }

    roundCounterText.textContent = `round: ${currentRound}/5`;
}


//click repeat sequence
function handleRepeatNextClick() {
    if (repeatButtonText.textContent === 'next') {
        startNextRound();
    } else {
        document.body.classList.add('body_game-not-start');
        if (!repeatButtonClicked) {
            gameInputSpan.textContent = '';
            userSequence = [];
            keyboardSimulation(currentSequence);
            repeatButtonClicked = true;
            repeatButton.disabled = true;
            repeatButton.classList.add('game__repeat-btn_disabled');
        }
    }
}

repeatButton.addEventListener('click', handleRepeatNextClick);

//modal for win in round
const modal = document.createElement('div');
modal.classList.add('game__modal');

const modalContainer = document.createElement('div');
modalContainer.classList.add('modal__container');

const modalText = document.createElement('p');
modalText.classList.add('modal__text');
modalText.textContent = 'Great! You can continue!';
modalContainer.appendChild(modalText);

//modal close-button
const closeModalButton = document.createElement('button');
closeModalButton.classList.add('modal__button')

const closeModalButtonText = document.createElement('h3');
closeModalButtonText.classList.add('modal-button__text')
closeModalButtonText.textContent = 'close';

closeModalButton.appendChild(closeModalButtonText);

modalContainer.appendChild(closeModalButton);

modal.appendChild(modalContainer);
gameSection.appendChild(modal);

closeModalButton.addEventListener('click', hidenModal);

function hidenModal() {
    modal.style.display = 'none';
    if (!isCorrectInput) {
        userSequence = [];
        gameInputSpan.textContent = '';
        if (errorCount >= 2) {
            modalText.textContent = 'Game over!';
            repeatButton.disabled = true;
            repeatButton.classList.add('game__repeat-btn_disabled');
            const keyboardButtons = document.querySelectorAll('.keyboard__btn');
            keyboardButtons.forEach(button => {
                button.classList.add('keyboard_disabled');
            });
               document.body.classList.add('body_game-not-start');
            restartButton.disabled = false;
        } else {
            modalText.textContent = 'Wrong! Try again!';
          restartButton.disabled = false;
            if (!repeatButtonClicked) {
                repeatButton.disabled = false;
                repeatButton.classList.remove('game__repeat-btn_disabled');
            }
        }

        return;

    }
    restartButton.disabled = false;
    repeatButton.disabled = false;
    repeatButton.classList.remove('game__repeat-btn_disabled');
}


function startNextRound() {
    gameInputSpan.textContent = '';
    currentRound++;
    userSequence = [];
    isCorrectInput = true;
    errorCount = 0;
    repeatButtonClicked = false;
    currentSequence = generateSequence(currentLevel, currentRound);
    const keyboardButtons = document.querySelectorAll('.keyboard__btn');
    keyboardButtons.forEach(button => {
        button.classList.add('keyboard_disabled');
    });
    keyboardSimulation(currentSequence);
    repeatButtonText.textContent = 'repeat the sequence';
    repeatButton.disabled = false;
    repeatButton.classList.remove('game__repeat-btn_disabled');
}

//handle input from keyboards
const keyboardButtons = document.querySelectorAll('.keyboard__btn');

keyboardButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (!isSimulating && gameStartBtn.style.display === 'none' && gameActive && errorCount < 2) {
      handleInput(button.dataset.symbol.toUpperCase());
      button.classList.add('keyboard__btn_active');
      setTimeout(() => {
        button.classList.remove('keyboard__btn_active');
      }, 200)
    }
  })
});

//check computer keyboard symbol
document.addEventListener('keydown', (event) => {
  if (!isSimulating && gameActive && errorCount < 2) {
    const key = event.key.toUpperCase();
    let symbol;
    if (currentLevel === 'easy') {
      if (/[0-9]/.test(key)) {
        symbol = key;
      } else {
        return;
      }
    } else if (currentLevel === 'medium') {
      if (/[A-Z]/.test(key)) {
        symbol = key;
      } else {
        return;
      }
    } else if (currentLevel === 'hard') {
      if (/[A-Z0-9]/.test(key)) {
        symbol = key;
      } else {
        return;
      }
    }
    if (symbol) {
      const virtualButton = Array.from(keyboardButtons).find(btn => btn.dataset.symbol.toUpperCase() === symbol)
      if (virtualButton) {
        handleInput(symbol);
        virtualButton.classList.add('keyboard__btn_active')
        setTimeout(() => {
          virtualButton.classList.remove('keyboard__btn_active')
        }, 200)
      }
    }
  }
});

//handling input processing
function handleInput(symbol) {
  if (!isSimulating) {
    userSequence.push(symbol);
    gameInputSpan.textContent = userSequence.join('');

    if (userSequence.length > 0 && currentSequence.length > 0) {
      if (userSequence[userSequence.length - 1] !== currentSequence[userSequence.length - 1].toUpperCase()) {
        isCorrectInput = false;
        errorCount++;
        if(errorCount === 1) {
          setTimeout(() => {
            modalText.textContent = 'Wrong! Try again!';
            if (!repeatButtonClicked) {
              repeatButton.disabled = false;
              repeatButton.classList.remove('game__repeat-btn_disabled');
            }

            modal.style.display = 'flex';
          }, 500);
          return;
        }

        setTimeout(() => {
          modalText.textContent = 'Game over!';
          repeatButton.disabled = true;
          repeatButton.classList.add('game__repeat-btn_disabled');
          const keyboardButtons = document.querySelectorAll('.keyboard__btn');
          keyboardButtons.forEach(button => {
            button.classList.add('keyboard_disabled');
          });
          document.body.classList.add('body_game-not-start');
          modal.style.display = 'flex';
        }, 500);
        return;

      }
    }


    if (userSequence.length === currentSequence.length && isCorrectInput) {
      if (currentRound < 5) {
        setTimeout(() => {
          document.body.classList.add('body_game-not-start');
          const keyboardButtons = document.querySelectorAll('.keyboard__btn');
            keyboardButtons.forEach(button => {
            button.classList.add('keyboard_disabled');
          });
          modalText.textContent = 'Great! You can continue!';
          modal.style.display = 'flex';
          restartButton.disabled = true;
          repeatButton.disabled = true;
          repeatButton.classList.add('game__repeat-btn_disabled');

        }, 500);
        repeatButtonText.textContent = 'next';

      } else {
        setTimeout(() => {
          modalText.textContent = 'Congratulations! You win!';
          modal.style.display = 'flex';
          restartButton.disabled = false;
          repeatButton.disabled = true;
          repeatButton.classList.add('game__repeat-btn_disabled');
        }, 500);
      }
    }
  }
}