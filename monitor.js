const readline = require('readline');

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

async function isTemperatureOk(temperature) {
  return await isVitalOk('Temperature', temperature, 95, 102);
}

async function isPulseRateOk(pulseRate) {
  return await isVitalOk('Pulse Rate', pulseRate, 60, 100);
}

async function isSpo2Ok(spo2) {
  return await isVitalOk('Oxygen Saturation', spo2, 90, Infinity);
}

async function vitalsOk(temperature, pulseRate, spo2) {
  const tempOk = await isTemperatureOk(temperature);
  const pulseOk = await isPulseRateOk(pulseRate);
  const spo2Ok = await isSpo2Ok(spo2);
  return tempOk && pulseOk && spo2Ok;
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve =>
    rl.question(query, answer => {
      rl.close();
      resolve(answer);
    })
  );
}

(async () => {
  const tempInput = await askQuestion('Enter Temperature (°F): ');
  const pulseInput = await askQuestion('Enter Pulse Rate (bpm): ');
  const spo2Input = await askQuestion('Enter SpO2 (%): ');

  const temperature = parseFloat(tempInput);
  const pulseRate = parseInt(pulseInput);
  const spo2 = parseInt(spo2Input);

  const allVitalsOk = await vitalsOk(temperature, pulseRate, spo2);
  console.log('\nFinal Vitals Status:', allVitalsOk ? 'All vitals are OK ✅' : 'Some vitals are NOT OK ❌');
})();


