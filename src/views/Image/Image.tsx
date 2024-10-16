import MapSync from '../../components/Map/MapSync';
import { Button, Dropdown, Menu, MenuItem, Divider } from '@hotosm/ui/dist/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import "./Image.styles.css";

const createDownloadLink = (data) => (
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
)

const Image = () => {

    const aoi = useSelector((state) => state.project.aoi);
    const grid = useSelector((state) => state.project.grid);
    const navigate = useNavigate();

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title"><strong>Image</strong> | Check available imagery</h1>
                <div className="buttons">
                    <Dropdown>
                        <Button slot="trigger" caret>Toolkit</Button>
                        <Menu className="menu">
                            <MenuItem disabled={!aoi}><a href={createDownloadLink(aoi)} download={`aoi.geojson`}>Download Area</a></MenuItem>
                            <MenuItem disabled={!grid}><a href={createDownloadLink(grid)} download={`grid.geojson`}>Download Grid</a></MenuItem>
                            <Divider />
                            <MenuItem>
                                Tools
                                <Menu slot="submenu">
                                <MenuItem><a href="https://openaerialmap.org" target="_blank">OpenAerialMap</a></MenuItem>
                                <MenuItem><a href="https://opendronemap.org/webodm/download/" target="_blank">OpenDroneMap</a></MenuItem>
                                </Menu>
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                    <Button variant="success" href="https://dronetm.org/" target="_blank">Capture your own imagery</Button>
                    <Button variant="primary" onClick={() => navigate("/mapping")}>Next</Button>
                </div>
            </div>
            <MapSync aoi={aoi} grid={grid} center={[-13.56, -16.52]} zoom={3} />
        </>
    )
}

export default Image;

