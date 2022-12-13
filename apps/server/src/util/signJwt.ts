import jwt from "jsonwebtoken";

const signJwt = (userID: string, username: string) => {
  const token = jwt.sign({ userID, username }, process.env.JWT_KEY as string, {
    expiresIn: "1h",
  });

  return token;
};

export default signJwt;
