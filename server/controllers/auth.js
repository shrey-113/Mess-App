const { DB } = require("../db/dbConnection");
const google = require("googleapis").google;
const { login, signup } = require("./LoginSignup");

const checkForLogin = async (name, email, photo) => {
  try {
    const existing = await DB.query(
      `Select Email from Users where Email = '${email}'`
    );

    if (existing.length > 0) {
      //login
      const { token, role } = await login(email);
      return { token, role };
    } else {
      //signup
      const { token, role } = await signup(name, email, photo);
      return { token, role };
    }
  } catch (error) {
    console.log(error);
  }
};

const authController = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      throw new CError("Code parameter is required", 400);
    }

    // Create an OAuth2 client instance
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.OAUTH_REDIRECT_URL
    );

    // Exchange the authorization code for access token and refresh token
    const { tokens } = await oauth2Client.getToken(code);
    const { access_token, refresh_token } = tokens;

    // Set the access token in the OAuth2 client for future requests
    oauth2Client.setCredentials({
      access_token,
      refresh_token,
    });

    // Create a Google People API instance
    const people = google.people({ version: "v1", auth: oauth2Client });

    // Fetch user's profile information
    const { data: personInfo } = await people.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos",
    });

    // Extract required information from the personInfo object
    const name = personInfo.names.find(
      (name) => name.metadata.primary
    )?.displayName;
    const profileImage = personInfo.photos.find(
      (photo) => photo.metadata.primary
    )?.url;
    const email = personInfo.emailAddresses.find(
      (email) => email.metadata.primary
    )?.value;

    const token = await checkForLogin(name, email, profileImage);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { authController };
