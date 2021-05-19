export function calculateTime(counter) {
  const hourCounter = Math.floor(counter / (60 * 60));
  const minuteCounter = Math.floor(counter / 60) - hourCounter * 60;

  const secondCounter = counter % 60;

  const computedSecond =
    String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
  const computedMinute =
    String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
  const computedHour =
    String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

  return { computedHour, computedMinute, computedSecond };
}
