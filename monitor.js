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

function checkTemperature(temperature) {
  return isVitalOk('Temperature', temperature, 95, 102);
}

function checkPulse(pulseRate) {
  return isVitalOk('Pulse Rate', pulseRate, 60, 100);
}

function checkSpo2(spo2) {
  return isVitalOk('Oxygen Saturation', spo2, 90, Infinity);
}

function vitalsOk(temperature, pulseRate, spo2) {
  const checks = [
    checkTemperature(temperature),
    checkPulse(pulseRate),
    checkSpo2(spo2),
  ];
  return checks.every(Boolean);
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


