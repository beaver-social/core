import { motion } from "framer-motion";

export default function Mentioned() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-2 border items-center text-grey-500 justify-center p-10 rounded-sm"
    >
      <p className="text-sm">Nothing to show..</p>
    </motion.div>
  );
}
