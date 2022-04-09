import React, {useState} from 'react';
import {
    Box,
    Container,
    CssBaseline,
} from '@mui/material';
import Header from './components/Header';
import TabbedBody from './components/TabbedBody';
import './App.css';

function App() {
    const [selectedOrgIndex, setSelectedOrgIndex] = useState(0);

    const orgs = [
        'DBL',
        'DCS',
        'eBible',
        'Vachan',
    ];

    return (<>
            <CssBaseline/>
            <Container fixed className="App">
                <Header orgs={orgs} selectedOrgIndex={selectedOrgIndex} setSelectedOrgIndex={setSelectedOrgIndex} />
                 <Box id="body">
                     <TabbedBody selectedOrg={orgs[selectedOrgIndex]} />
                </Box>
            </Container>
        </>
    );
}

export default App;
