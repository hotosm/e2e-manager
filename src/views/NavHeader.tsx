import React from 'react';
import { Header } from '@hotosm/ui/dist/react';

const tabs = [
    {
        label: 'START',
        clickEvent: async () => {
            console.log(1)
        }
    },
    {
        label: '1. IMAGE',
        clickEvent: async () => {
            console.log(1)
        }
    },
    {
        label: '2. MAP',
        clickEvent: async () => {
            console.log(2)
        }
    },
    {
        label: '3. USE',
        clickEvent: async () => {
            console.log(3)
        }
    }
];

const NavHeader = () => {
    return (
        <Header
            tabs={tabs}
            title="End-to-End Mapping"
        />
    )
}

export default NavHeader;
