import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props {
  visible: boolean;
  onClose: VoidFunction;
}
const MobileFilters: React.FC<Props> = (props) => {
  const handleCloseMobileFilters = (e: any) => {
      if (e.target.value === "container") {
        
          props.onClose();
    }
  };
  if (!props.visible) return null;
  return (
    <div className="fixed inset-0 backdrop backdrop-blur-sm z-50 bg-white">
      <div id="container" className="bottom-0 fixed" >
        <Icon.X onClick={handleCloseMobileFilters} size={50}/>
      </div>
    </div>
  );
};
export default MobileFilters;
