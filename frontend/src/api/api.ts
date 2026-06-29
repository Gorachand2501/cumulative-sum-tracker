const BASE_URL = "http://127.0.0.1:8000";

export async function getNumbers() {
  const response = await fetch(`${BASE_URL}/numbers`);

  return await response.json();
}

export async function getSum() {
  const response = await fetch(`${BASE_URL}/sum`);

  return await response.json();
}

export async function addNumber(value: number) {
  const response = await fetch(
    `${BASE_URL}/numbers`,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        value: value,
      }),
    },
  );

  return await response.json();
}
