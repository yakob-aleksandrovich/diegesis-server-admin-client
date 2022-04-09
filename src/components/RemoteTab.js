import React from 'react';

import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

import TranslationsTable from "./TranslationsTable";

export default function RemoteTab({selectedOrg}) {

    const columns = [
        { id: 'id', label: 'ID', minWidth: 100 },
        { id: 'languageCode', label: 'Language', minWidth: 100 },
        {
            id: 'title',
            label: 'Title',
            minWidth: 170,
        },
        {
            id: 'isLocal',
            label: 'Local?',
            minWidth: 100,
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

    function createData(
        id,
        languageCode,
        title,
        isLocal,
    ) {
        return {
            id,
            languageCode,
            title,
            isLocal,
            actions: <Button disabled={isLocal} onClick={() => console.log(selectedOrg, id)}>
                <Download/>
            </Button>
        };
    }

    const rows = [
        createData('fraLSG', 'fra', 'Louis Segond', true),
        createData('fraLSG2', 'fra', 'Louis Segond', false),
        createData('fraLSG3', 'fra', 'Louis Segond', true),
        createData('fraLSG4', 'fra', 'Louis Segond', true),
    ];

    return <TranslationsTable columns={columns} rows={rows} />
}
