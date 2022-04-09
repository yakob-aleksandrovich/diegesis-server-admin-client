import React from 'react';

import TranslationsTable from "./TranslationsTable";

export default function LocalTab({selectedOrg}) {

    const columns = [
        { id: 'id', label: 'ID', minWidth: 100 },
        { id: 'languageCode', label: 'Language', minWidth: 100 },
        {
            id: 'title',
            label: 'Title',
            minWidth: 170,
        },
        {
            id: 'hasUsfm',
            label: 'USFM?',
            minWidth: 100,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'hasUsx',
            label: 'USX?',
            minWidth: 100,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'hasSuccinct',
            label: 'Succinct?',
            minWidth: 100,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
        {
            id: 'hasVrs',
            label: 'VRS?',
            minWidth: 100,
            align: 'right',
            format: value => value ? "yes" : "no"
        },
    ];

    function createData(
        id,
        languageCode,
        title,
        hasUsfm,
        hasUsx,
        hasSuccinct,
        hasVrs,
    ) {
        return { id, languageCode, title, hasUsfm, hasUsx, hasSuccinct, hasVrs };
    }

    const rows = [
        createData('fraLSG', 'fra', 'Louis Segond', true, false, false, false),
        createData('fraLSG2', 'fra', 'Louis Segond', true, false, false, false),
        createData('fraLSG3', 'fra', 'Louis Segond', true, false, false, false),
        createData('fraLSG4', 'fra', 'Louis Segond', true, false, false, false),
    ];

    return <TranslationsTable columns={columns} rows={rows} />

}
