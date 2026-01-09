const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getWeatherData = async (cityName) => {
  const response = await fetch(
    `${API_BASE}/api/weather?city=${encodeURIComponent(cityName)}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
};
