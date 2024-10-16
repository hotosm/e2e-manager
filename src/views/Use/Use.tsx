import { useSelector } from 'react-redux';
import "./Use.styles.css";
import { Button, Dropdown, Menu, MenuItem } from '@hotosm/ui/dist/react';
import Map from "../../components/Map/Map";

const Use = () => {

    const aoi = useSelector((state) => state.project.aoi);

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title"><strong>Use</strong> | The maps</h1>
                <div className="buttons">
                    <Dropdown>
                        <Button slot="trigger" caret>Toolkit</Button>
                        <Menu className="menu">
                            <MenuItem disabled>Export OSM map data</MenuItem>
                            <MenuItem disabled>Download report</MenuItem>
                        </Menu>
                    </Dropdown>
                    <Button variant="success" href="https://export.hotosm.org" target="_blank">Export Tool</Button>
                </div>
            </div>
            <Map aoi={aoi} center={[-13.56, -16.52]} zoom={3} />
        </>
    )
}

export default Use;

