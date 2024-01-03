import {useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from "@mui/material/Container";
import ProductList from "../../components/Product/Product.tsx";
import Charts from "../../components/Chart/Charts.tsx";
import ButtonAppBar from "../../components/Appbar/ButtonAppBar.tsx";

export default function Dashboard() {
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="lg">
            <ButtonAppBar />
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList variant="fullWidth" onChange={handleChange}>
                            <Tab label="Chart" value="1"/>
                            <Tab label="Product" value="2"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1"><Charts/></TabPanel>
                    <TabPanel value="2">
                        <ProductList/>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
}
