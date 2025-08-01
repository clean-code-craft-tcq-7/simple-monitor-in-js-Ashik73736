function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayVitalAlert(val, msg) {
  console.log(msg);
  for (let i = 0; i < val; i++) {
    process.stdout.write('\r* ');
    await sleep(1000);
    process.stdout.write('\r *');
    await sleep(1000);
  }
  console.log();
}

async function isVitalOk(name, value, minVal, maxVal) {
  if (value < minVal || value > maxVal) {
    await displayVitalAlert(6, `${name} is out of range!`);
    return false;
  }
  return true;
}

export async function checkTemperature(temperature) {
  return isVitalOk('Temperature', temperature, 95, 102);
}

export async function checkPulse(pulseRate) {
  return isVitalOk('Pulse Rate', pulseRate, 60, 100);
}

export async function checkSpo2(spo2) {
  return isVitalOk('Oxygen Saturation', spo2, 90, Infinity);
}

export async function vitalsOk(temperature, pulseRate, spo2) {
  const results = await Promise.all([
    checkTemperature(temperature),
    checkPulse(pulseRate),
    checkSpo2(spo2),
  ]);
  return results.every(Boolean);
}
