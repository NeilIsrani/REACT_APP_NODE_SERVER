import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
export const fetchAllModules = async () => {
  const { data } = await axios.get(MODULES_API);
  return data;
};