export const getAIResponse = async (prompt, history = []) => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, history }),
    });
    const data = await res.json();
    return data.text;
  } catch {
    return 'Terjadi kesalahan sistem pada AI.';
  }
};