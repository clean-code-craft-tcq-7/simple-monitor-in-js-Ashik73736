
export async function vitalsOk(temperature, pulseRate, spo2) {
  if (temperature > 102 || temperature < 95) {
    console.log("Temperature is critical!");
    for (let i = 0; i < 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return false;
  } else if (pulseRate < 60 || pulseRate > 100) {
    console.log("Pulse Rate is out of range!");
    for (let i = 0; i < 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return false;
  } else if (spo2 < 90) {
    console.log("Oxygen Saturation out of range!");
    for (let i = 0; i < 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return false;
  }
  return true;
}
