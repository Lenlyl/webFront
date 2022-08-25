import { createContext } from "react";
const context = createContext();
const {Provider,Consumer} = context;
export default context;
export {Provider,Consumer};