const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client();
const JWT_SECRET = process.env.JWT_SECRET || 'xeno_secret';

exports.googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({ idToken: token });
    const payload = ticket.getPayload();

    const userData = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    const jwtToken = jwt.sign(userData, JWT_SECRET, { expiresIn: '6h' });
    res.json({ token: jwtToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
};
