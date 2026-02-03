export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, description, column } = req.body;

    const CONFIG = {
      API_TOKEN: 'hWmv5tu1CnbphirRp5ZmVtyM',
      ACCOUNT_SLUG: '6101486',
      BOARD_ID: '03fh5nvlsyoce2arc9yqa7ka3',
      API_BASE: 'https://app.fizzy.do'
    };

    const response = await fetch(
      `${CONFIG.API_BASE}/${CONFIG.ACCOUNT_SLUG}/boards/${CONFIG.BOARD_ID}/cards`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CONFIG.API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ card: { title, description } })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

// Get response as text first to handle empty responses
      const responseText = await response.text();
      
      // Handle potentially empty or non-JSON responses
      let data = {};
      if (responseText) {
              try {
                        data = JSON.parse(responseText);
              } catch (e) {
                        data = { message: responseText || 'Card created successfully' };
              }
      } else {
              data = { message: 'Card created successfully' };
      }

        return res.status(200).json(data);
      } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
