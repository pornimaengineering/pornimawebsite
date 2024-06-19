document.getElementById('solar-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve form values
  const location = document.getElementById('location').value;
  const roofArea = parseFloat(document.getElementById('roof-area').value);
  const energyConsumption = parseFloat(document.getElementById('energy-consumption').value);
  const electricityRate = parseFloat(document.getElementById('electricity-rate').value);

  // Perform calculations
  const solarIrradiance = 5.0; // Example value for solar irradiance (kWh/m²/day)
  const panelEfficiency = 0.18; // Example value for panel efficiency
  const daysInYear = 365;

  const energyProduction = solarIrradiance * roofArea * panelEfficiency * daysInYear;
  const annualSavings = energyProduction * electricityRate;
  const paybackPeriod = energyConsumption / energyProduction;
  const roi = (annualSavings * paybackPeriod) / 100;

  // Display results
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h3>Results:</h3>
    <p>Estimated Annual Energy Production: ${energyProduction.toFixed(2)} kWh</p>
    <p>Estimated Annual Savings: ${annualSavings.toFixed(2)}</p>
    <p>Payback Period: ${paybackPeriod.toFixed(2)} years</p>
    <p>Return on Investment (ROI): ${roi.toFixed(2)}%</p>
  `;
});
