import { useEffect, useState } from "react";
import { Header } from '@hotosm/ui/dist/react';
import { useLocation, useNavigate } from 'react-router-dom'

const tabsPath = {
    "/": 0,
    "/image": 1
}

const NavHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        setSelectedTab(tabsPath[location.pathname]);
    }, [location, selectedTab])

    const tabs = [
        {
            label: 'START',
            clickEvent: async () => {
                navigate("/");
            }
        },
        {
            label: '1. IMAGE',
            clickEvent: async () => {
                navigate("/image");
            }
        },
        {
            label: '2. MAP',
            clickEvent: async () => {
                navigate("/mapping");
            }
        },
        {
            label: '3. USE',
            clickEvent: async () => {
                navigate("/use");
            }
        }
    ];

    return (
        <Header
            tabs={tabs}
            selectedTab={selectedTab}
            title={"End to End Mapping"}
        />
    )
}

export default NavHeader;
