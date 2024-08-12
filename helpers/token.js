import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { TOKEN_SECRET, TOKEN_EXPIRES } = process.env;

export const auth = (id) => {
  return jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES });
};

export const checkAuth = (token) => {
  const { id } = jwt.verify(token, TOKEN_SECRET);
  return id;
};
