import Profile from "./Profile";
import Event from "./Event";
import Deliveries from "./Deliveries";
import useSelectionStore from "@/state/selection";
import { useShallow } from "zustand/react/shallow";

const Layout3 = () => {
  const { program } = useSelectionStore(
    useShallow((state) => ({
      program: state.program
    }))
  );

  return (
    <div className="chr-tracker-layout3-container">
      {program.id === "AyPkCOMmgdd" ? <Deliveries /> : <Event />}
      <Profile />
    </div>
  );
};
export default Layout3;
