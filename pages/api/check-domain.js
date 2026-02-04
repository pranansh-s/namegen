import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('https://domainstatus.p.rapidapi.com/v1/domain/available', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'domainstatus.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Domain check API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to check domain availability',
    });
  }
}
