import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import DashBoardComp from "../../Components/Client/Dashboard/DashBoardComp";
import OnBoard from "../../Components/Client/Dashboard/OnBoard";
import { UserContext } from "../../Contexts/UserContext";

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  return (
    <AnimatePresence initial={false} mode="wait">
      {userData?.accessLevel === 1 ? (
        <DashBoardComp />
      ) : (
        <OnBoard key="onboard" />
      )}
    </AnimatePresence>
  );
}
