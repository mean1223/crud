import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#333' }}> {/* เปลี่ยนพื้นหลังเป็นสีมืด */}
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}> {/* เปลี่ยนสีข้อความเป็นขาว */}
                        CRUD
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
