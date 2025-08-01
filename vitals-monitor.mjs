function isInRange(value, min, max) {
  return value >= min && value <= max;
}

function checkVital(name, value, min, max) {
  const result = isInRange(value, min, max);
  if (!result) {
    console.log(`${name} is out of range: ${value}`);
  }
  return result;
}

export async function vitalsOk(temperature, pulseRate, spo2) {
  const checks = [
    checkVital("Temperature", temperature, 97, 99),
    checkVital("Pulse Rate", pulseRate, 60, 100),
    checkVital("SPO2", spo2, 95, 100),
  ];
  return checks.every(Boolean);
}
