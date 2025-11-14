const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API endpoints for temperature conversions
app.get("/toFahrenheit/:celsius", (req, res) => {
  const celsius = parseFloat(req.params.celsius);
  if (isNaN(celsius)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const fahrenheit = celsiusToFahrenheit(celsius);
  res.json({ celsius, fahrenheit });
});

app.get("/toCelsius/:fahrenheit", (req, res) => {
  const fahrenheit = parseFloat(req.params.fahrenheit);
  if (isNaN(fahrenheit)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const celsius = fahrenheitToCelsius(fahrenheit);
  res.json({ fahrenheit, celsius });
});

app.get("/toKelvin/:celsius", (req, res) => {
  const celsius = parseFloat(req.params.celsius);
  if (isNaN(celsius)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const kelvin = celsiusToKelvin(celsius);
  res.json({ celsius, kelvin });
});

app.get("/fromKelvin/:kelvin", (req, res) => {
  const kelvin = parseFloat(req.params.kelvin);
  if (isNaN(kelvin)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const celsius = kelvinToCelsius(kelvin);
  res.json({ kelvin, celsius });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
