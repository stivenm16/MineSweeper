function randomNumber(size: number) {
  return Math.floor(Math.random() * size);
}

// Comparador de posiciones
function positionMatch(a: number[], b: number[]) {
  return a[0] === b[0] && a[1] === b[1];
}

/* Esta función retorna un array con las posiciones de las minas donde internamente verifica 
que no se crucen una encima de otra */

function getMinePositions(boardSize: number, minesInGame: number) {
  const positions: number[][] = [];

  while (positions.length < minesInGame) {
    let position: number[] = [randomNumber(boardSize), randomNumber(boardSize)];

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

export { getMinePositions, positionMatch };
