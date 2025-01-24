// import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";
import * as authServices from "../services/auth.js";
import { registerUser, requestResetToken, resetPassword } from "../services/auth.js";
import { generateOAuthUrl } from "../utils/googleOAuth2.js";

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
});

res.cookie("sessionId", session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
});
};

// export const registerController = async(req, res)=> {
//      const user = await registerUser(req.body);

//     res.status(201).json({
//       status: 201,
//       message: 'Successfully registered a user!',
//       data: user,
//     });
//   };

export const registerController = async (req, res, next) => {
  try {
      const user = await registerUser(req.body);

      // Видалення поля пароля з відповіді
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;

      // Повернення відповіді
      res.status(201).json({
          status: 201,
          message: "Successfully registered a user!",
          data: userWithoutPassword,
      });
  } catch (error) {
      next(error);
  }
};

  export const loginController = async(req, res)=> {
    const session = await authServices.login(req.body);

    setupSession(res, session);
    
    res.json({
        status: 200,
        message: 'Successfully login user!',
        data: {
            accessToken: session.accessToken,
        }
    });
  };

  export const refreshTokenController = async(req, res)=> {
    const {refreshToken, sessionId} = req.cookies;
    const session = await authServices.refreshToken({refreshToken, sessionId});

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refresh session',
      data: {
          accessToken: session.accessToken,
      }
  });
  };

export const logoutController = async(req, res)=> {
  if(req.cookies.sessionId) {
      await authServices.logout(req.cookies.sessionId);
  }

  res.clearCookie("refreshToken");
  res.clearCookie("sessionId");

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent.',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async(req, res)=> {
  const url = generateOAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async(req, res)=> {
  const {code} = req.body;
  const session = await authServices.loginOrRegisterWithGoogle(code);

  setupSession(res, session);

  res.json({
      status: 200,
      message: "Successfully login with Google OAuth",
      data: {
          accessToken: session.accessToken,
      }
  });
};