import React from 'react'
import Editor from "@/app/documents/[documentId]/editor";

interface DocumentIdPageProps {
    params : Promise<{documentId : string}>
}

async function Document({params} : DocumentIdPageProps) {
    const {documentId} = await params;

    return <div className="min-h-screen bg-[#FAFBFD]">
        <Editor/>
    </div>


}

export default Document
