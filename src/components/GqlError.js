import {Box, Paper, Typography} from "@mui/material";
import React from "react";

export default function GqlError({error}) {
    return <Paper sx={{width: '100%', overflow: 'hidden'}}>
        {
            error.message ?
                <Box>
                    <Typography variant="h5">Failed to Fetch</Typography>
                </Box> :
                <Box>
                    <Typography variant="h5">GraphQL Error</Typography>
                    <Typography>{JSON.stringify(error)}</Typography>
                </Box>
        }
    </Paper>;
}
