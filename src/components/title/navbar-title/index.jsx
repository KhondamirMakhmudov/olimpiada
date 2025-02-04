import { motion } from "framer-motion";

const NavbarTitle = ({ children }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, translateY: "30px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.2 }}
      className="text-center text-[32px] text-[#3965c6] font-semibold"
    >
      {children}
    </motion.h1>
  );
};
export default NavbarTitle;
