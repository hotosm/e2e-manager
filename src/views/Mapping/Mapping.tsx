import { useSelector } from 'react-redux';
import { Button, Dropdown, Menu, MenuItem, TabGroup, Tab, TabPanel} from '@hotosm/ui/dist/react';
import { useNavigate } from 'react-router-dom'
import "./Mapping.styles.css";

const createDownloadLink = (data) => (
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
)

const Mapping = () => {

    const aoi = useSelector((state) => state.project.aoi);
    const navigate = useNavigate();

    return (
        <>
            <div className="aoi-view--top">
                <h1 className="title"><strong>Mapping</strong> | Public and custom maps</h1>
                <div className="buttons">
                    <Dropdown>
                        <Button slot="trigger" caret>Toolkit</Button>
                        <Menu className="menu">
                            <MenuItem disabled={!aoi}><a href={createDownloadLink(aoi)} download={`aoi.geojson`}>Download area</a></MenuItem>
                        </Menu>
                    </Dropdown>
                    <Button variant="primary" onClick={() => navigate("/use")}>Next</Button>
                </div>
            </div>

            <TabGroup placement="start">
                <Tab className="tab" slot="nav" panel="remote">Remote</Tab>
                <Tab className="tab" slot="nav" panel="ai">AI</Tab>
                <Tab className="tab" slot="nav" panel="field">Field</Tab>
                <TabPanel name="remote">
                    <h4>This is the Remote tab panel.</h4>
                    <Button href="https://tasks.hotosm.org" target="_blank" variant="success">Create project</Button>
                    <pre>http://localhost:5000/api/v2/projects/queries/bbox/</pre>
                    <pre>?bbox=-64.77835,-32.71595,-64.67733,-32.64902&srid=4326</pre>
                </TabPanel>
                <TabPanel name="ai">
                    <h4>This is the AI tab panel.</h4>
                    <Button href="https://fair.hotosm.org" target="_blank" variant="success">Create project</Button>
                </TabPanel>
                <TabPanel name="field">
                    <h4>This is the Field tab panel.</h4>
                    <Button href="https://fmtm.hotosm.org" target="_blank" variant="success">Create project</Button>
                </TabPanel>
            </TabGroup>
        </>
    )
}

export default Mapping;

