function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function blinkPattern(patternFn, times) {
  for (let i = 0; i < times; i++) {
    await patternFn();
  }
}

const patternA = async () => {
  process.stdout.write("\r* ");
  await delay(1000);
  process.stdout.write("\r *");
  await delay(1000);
};

const patternB = async () => {
  await delay(2000);
};

const patternC = async () => {
  await delay(1000);
  process.stdout.write("\r *");
  await delay(1000);
};

async function checkTemperature(temp) {
  if (temp > 102 || temp < 95) {
    console.log("Temperature is critical!");
    await blinkPattern(patternA, 6);
    return false;
  }
  return true;
}

async function checkPulse(pulse) {
  if (pulse < 60 || pulse > 100) {
    console.log("Pulse Rate is out of range!");
    await blinkPattern(patternB, 6);
    return false;
  }
  return true;
}

async function checkSpo2(spo2) {
  if (spo2 < 90) {
    console.log("Oxygen Saturation out of range!");
    await blinkPattern(patternC, 6);
    return false;
  }
  return true;
}

export async function vitalsOk(temperature, pulseRate, spo2) {
  return (
    await checkTemperature(temperature) &&
    await checkPulse(pulseRate) &&
    await checkSpo2(spo2)
  );
}
