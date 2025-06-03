import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";

export default function MessagesFeed() {
  return (
    <div className="flex-1 mx-auto">
      {/* search bar */}
      <div className="relative p-4 border-b">
        <Icon
          name="Search"
          className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search Messages"
          className="w-full pl-12 pr-4 py-2 rounded-full bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-2 items-center text-grey-500 justify-center p-10 rounded-sm"
      >
        <p className="text-sm">Nothing to show..</p>
      </motion.div>
    </div>
  );
}
