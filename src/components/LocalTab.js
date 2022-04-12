import React from 'react';

import { searchQuery } from '../lib/search';
import TranslationsTable from "./TranslationsTable";
import {gql, useQuery} from "@apollo/client";
import {Box, Paper, Typography} from "@mui/material";

export default function LocalTab({selectedOrg, searchLang, searchText}) {

    const queryString = searchQuery(
        `query localTranslations {
        org(name: "%org%") {
            id: name
            localTranslations%searchClause% {
                id
                languageCode
                title
                hasUsfm
                hasUsx
                hasSuccinct
                hasVrs
            }
        }
    }`,
        selectedOrg,
        searchLang,
        searchText
    );

    const {loading, error, data} = useQuery(
        gql`${queryString}`,
        {pollInterval: 2000}
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
            id: 'hasUsfm',
            label: 'USFM?',
            minWidth: 50,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'hasUsx',
            label: 'USX?',
            minWidth: 50,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'hasSuccinct',
            label: 'Succinct?',
            minWidth: 50,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'hasVrs',
            label: 'VRS?',
            minWidth: 50,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
    ];

    function createData(localTranslation) {
        return {
            id: localTranslation.id,
            languageCode: localTranslation.languageCode,
            title: localTranslation.title,
            hasUsfm: localTranslation.hasUsfm,
            hasUsx: localTranslation.hasUsx,
            hasSuccinct: localTranslation.hasSuccinct,
            hasVrs: localTranslation.hasVrs,
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
                <Typography>{JSON.stringify(error)}</Typography>
            </Box>
        </Paper>
    }
    const rows = data.org.localTranslations.map(lt => createData(lt));
    return <TranslationsTable columns={columns} rows={rows}/>

}
