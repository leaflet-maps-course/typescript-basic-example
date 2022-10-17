export function getColor(numberValue: number) {
    return numberValue >= 0 && numberValue < 1
      ? "white"
      : numberValue >= 1 && numberValue < 2
      ? "green"
      : numberValue >= 2 && numberValue < 3
      ? "#6e8c51"
      : numberValue >= 3 && numberValue < 4
      ? "yellow"
      : numberValue >= 4 && numberValue < 5
      ? "#f5d142"
      : numberValue >= 5 && numberValue < 6
      ? "orange"
      : numberValue >= 6 && numberValue < 7
      ? "red"
      : "pink";
  }