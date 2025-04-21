import { FC } from "react";
import ProtectedLayout from "./ProtectedLayout.tsx";
import SideBarLayout from "./SideBarLayout.tsx";

const ProtectedSideBarLayout: FC = () => {
    return (
        <ProtectedLayout>
            <SideBarLayout />
        </ProtectedLayout>
    );
}

export default ProtectedSideBarLayout;