import React, {useState} from 'react';
import {
    gql,
    useQuery,
    useApolloClient,
} from "@apollo/client";

import {Box, Button, Paper, Typography} from '@mui/material';
import {Download} from '@mui/icons-material';

import TranslationsTable from "./TranslationsTable";

export default function RemoteTab({selectedOrg}) {

    const client = useApolloClient();

    const queryString = `query catalogEntries {
            org(name: "%org%") {
                id: name
                catalogEntries {
                    id
                    languageCode
                    title
                    hasLocalUsfm
                    hasLocalUsx

                }
            }
        }`.replace('%org%', selectedOrg);

    const {loading, error, data} = useQuery(
        gql`${queryString}`,
        {pollInterval: 9000}
    );

    const columns = [
        {id: 'id', label: 'ID', minWidth: 100},
        {id: 'languageCode', label: 'Language', minWidth: 50},
        {
            id: 'title',
            label: 'Title',
            minWidth: 200,
        },
        {
            id: 'isLocal',
            label: 'Local?',
            minWidth: 50,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 100,
            align: 'right',
        },
    ];

    async function fetchTranslation(org, transId, hasUsfm, hasUsx) {
        const mutationString = `mutation Fetch {
                fetch%contentType%(
                  org: "%org%",
                  translationId: "%transId%"
                )
        }`.replace('%org%', org)
            .replace('%transId%', transId)
            .replace('%contentType%', org === 'DBL' ? 'Usx' : 'Usfm');
        setIsLoading(true);
        const result = await client.mutate({mutation: gql`${mutationString}`});
        setIsLoading(false);
        console.log(result.data);
    }

    function createData(catalogEntry) {
        return {
            id: catalogEntry.id,
            languageCode: catalogEntry.languageCode,
            title: catalogEntry.title,
            isLocal: catalogEntry.hasLocalUsfm || catalogEntry.hasLocalUsx,
            actions: <Button
                disabled={catalogEntry.hasLocalUsfm || catalogEntry.hasLocalUsx}
                onClick={
                    () => fetchTranslation(
                        selectedOrg,
                        catalogEntry.id,
                        catalogEntry.hasLocalUsfm,
                        catalogEntry.hasLocalUsx
                    )
                }
            >
                <Download/>
            </Button>
        };
    }

    if (loading) {
        return <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <Box>
                <Typography variant="h3">Loading</Typography>
            </Box>
        </Paper>
    }
    if (error) {
        return <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <Box>
                <Typography variant="h3">GraphQL Error</Typography>
                <Typography>{error}</Typography>
            </Box>
        </Paper>
    }
    const rows = data.org.catalogEntries.map(ce => createData(ce));
    return <TranslationsTable columns={columns} rows={rows}/>
}
