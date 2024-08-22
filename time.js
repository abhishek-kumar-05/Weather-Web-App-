// updateTime is use to set time in clock element in (12 hour) format
export const updateTime = () => {
  // accessing the orginal time
  const time = new Date();
  let hour = time.getHours(); // hour
  const min = time.getMinutes().toString().padStart(2, "0"); // minute
  const [formatedHour, ampm] = changeTimeFormat(hour); // calling changeTimeFormat Function
  // accessing the clock element and updating the content
  let timeVar = document.querySelector(".clock h1");
  timeVar.textContent = `${formatedHour}:${min} ${ampm}`;
};

export function changeTimeFormat(hour) {
  const ampm = hour >= 12 ? "PM" : "AM"; // checking wether its am or pm
  // changing the hour into (12 hour) format
  hour = hour % 12;
  hour = hour ? hour : 12;
  const formatedHour = hour.toString().padStart(2, "0");
  return [formatedHour, ampm];
}
