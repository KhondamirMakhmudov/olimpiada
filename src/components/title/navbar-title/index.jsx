import { motion } from "framer-motion";

const NavbarTitle = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "30px" }}
      animate={{ opacity: 1, translateY: "0px" }}
      transition={{ duration: 0.2 }}
      className=" text-[32px] text-[#3965c6] font-semibold"
    >
      {children}
    </motion.div>
  );
};
export default NavbarTitle;
