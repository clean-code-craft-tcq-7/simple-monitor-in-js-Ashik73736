function displayVitalAlert(msg) {
  console.log(msg);
}

function isVitalOk(name, value, minVal, maxVal) {
  if (value < minVal || value > maxVal) {
    displayVitalAlert(`${name} is out of range!`);
    return false;
  }
  return true;
}

export function checkTemperature(temperature) {
  return isVitalOk('Temperature', temperature, 95, 102);
}

export function checkPulse(pulseRate) {
  return isVitalOk('Pulse Rate', pulseRate, 60, 100);
}

export function checkSpo2(spo2) {
  return isVitalOk('Oxygen Saturation', spo2, 90, Infinity);
}

export function vitalsOk(temperature, pulseRate, spo2) {
  return (
    checkTemperature(temperature) &&
    checkPulse(pulseRate) &&
    checkSpo2(spo2)
  );
}
