export default async function handler(req, res) {
  const { prompt, history = [] } = req.body;

  const systemPrompt = `Kamu adalah AI assistant di portfolio Perdana Kurniawan Arta (perdanakun).
Fakta tentang dia:
- Freelance graphic designer & icon design specialist, 10+ tahun pengalaman
- Memimpin studio kecil bernama Conania
- Klien: 3000+ global client, termasuk Bank Mandiri, Telkom Indonesia, NGO internasional
- Filosofi desain: "logic + magic"
- Background vokasi teknik elektro sebelum pindah ke desain
- Platform: Fiverr, Dribbble
Jawab singkat, ramah, gaya chatbot portfolio. Kalau di luar topik ini, arahkan balik ke Perdana.`;

  const contents = [
    ...history.map(h => ({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    })),
    { role: 'user', parts: [{ text: prompt }] },
  ];

const r = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
    }),
  }
);

  const data = await r.json();

  if (!r.ok) {
    console.error('Gemini error:', data);
    return res.status(200).json({ text: `DEBUG: ${JSON.stringify(data.error)}` });
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    ?? 'Maaf, ada gangguan sistem.';

  res.status(200).json({ text });
}