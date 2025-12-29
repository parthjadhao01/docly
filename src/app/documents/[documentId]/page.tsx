import React from 'react'

interface DocumentIdPageProps {
    params : Promise<{documentId : string}>
}

async function Document({params} : DocumentIdPageProps) {
    const {documentId} = await params;

    return <>
        <div>DocumentId :</div>
        <div>{documentId}</div>
    </>


}

export default Document
