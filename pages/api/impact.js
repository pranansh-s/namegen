import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(
        `https://api.impact.com/Mediapartners/${process.env.NEXT_PUBLIC_IMPACT_ACCOUNT}/Programs/5618/TrackingLinks?DeepLink=https%3A%2F%2Fnamecheap.com%2Fdomains%2Fregistration%2Fresults%2F%3Fdomain%3D${req.body.name}`,
        {},
        {
          auth: {
            username: process.env.NEXT_PUBLIC_IMPACT_ACCOUNT,
            password: process.env.NEXT_PUBLIC_IMPACT_AUTH,
          },
        }
      );

      res.status(200).json({ link: response.data.TrackingURL });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json('Bad Method');
  }
}
