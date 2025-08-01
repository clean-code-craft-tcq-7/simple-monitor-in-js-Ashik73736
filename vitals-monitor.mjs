function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function blinkPatternA(times) {
  for (let i = 0; i < times; i++) {
    process.stdout.write("\r* ");
    await delay(1000);
    process.stdout.write("\r *");
    await delay(1000);
  }
}

async function blinkPatternB(times) {
  for (let i = 0; i < times; i++) {
    await delay(2000);
  }
}

async function blinkPatternC(times) {
  for (let i = 0; i < times; i++) {
    await delay(1000);
    process.stdout.write("\r *");
    await delay(1000);
  }
}

export async function vitalsOk(temperature, pulseRate, spo2) {
  if (temperature > 102 || temperature < 95) {
    console.log("Temperature is critical!");
    await blinkPatternA(6);
    return false;
  }

  if (pulseRate < 60 || pulseRate > 100) {
    console.log("Pulse Rate is out of range!");
    await blinkPatternB(6);
    return false;
  }

  if (spo2 < 90) {
    console.log("Oxygen Saturation out of range!");
    await blinkPatternC(6);
    return false;
  }

  return true;
}
