import { authDb } from "./authDb";

export const authUser = async (user, pass) => {
  const getUser = authDb.find(
    ({ username, password }) => username === user && password === pass
  );
  if (getUser) {
    return getUser;
  } else {
    return null;
  }
};
