import React from 'react'
import {ExternalLinkIcon, MoreVertical, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Id} from "../../../../convex/_generated/dataModel"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import RemoveDialog from "@/components/remove-dialog";


interface DocumentMenuProps {
    documentId : Id<"documents">;
    title : string;
    onNewTab : (id : Id<"documents">) => void;
}

function DocumentMenu({documentId,title,onNewTab}: DocumentMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem
                        onSelect={(e)=>e.preventDefault()}
                        onClick={(e) => {e.stopPropagation()}}
                    >
                        <TrashIcon className="size-4 mr-2"/>
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
                <DropdownMenuItem
                    onClick={()=> onNewTab(documentId)}
                >
                    <ExternalLinkIcon className="size-4 mr-2"/>
                    Open in a new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DocumentMenu
