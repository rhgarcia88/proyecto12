export const initialState = {
  playerSequence: [],
  level: 0,
  isPlayerTurn: false,
  isGameOver: false,
  hasGameStarted: false,
  isPlayingSequence: false,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        hasGameStarted: true,
        level: 1,
        playerSequence: [],
        isPlayerTurn: false,
        isGameOver: false,
        isPlayingSequence: true, // La secuencia empezará a reproducirse
      };
    case 'NEXT_LEVEL':
      return {
        ...state,
        level: state.level + 1,
        playerSequence: [],
        isPlayerTurn: false,
        isGameOver: false,
        isPlayingSequence: true, // La secuencia empezará a reproducirse
      };
    case 'PLAYER_TURN':
      return {
        ...state,
        isPlayerTurn: true,
        isPlayingSequence: false, // La secuencia ha terminado de reproducirse
      };
    case 'PLAYER_INPUT':
      return {
        ...state,
        playerSequence: [...state.playerSequence, action.payload],
      };
    case 'GAME_OVER':
      return {
        ...state,
        isGameOver: true,
        isPlayerTurn: false,
        isPlayingSequence: false,
      };
    case 'RESET_GAME':
      return {
        ...initialState,
        hasGameStarted: true, // Mantiene el juego como iniciado
        isPlayingSequence: true, // La secuencia se reproducirá después del reinicio
        level: 1,
      };
    default:
      return state;
  }
};