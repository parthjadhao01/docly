"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider ,
    RoomProvider ,
    ClientSideSuspense
} from "@liveblocks/react/suspense";
import FullScreenLoader from "@/components/full-screen-loader";
import {useParams} from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint="/api/liveblocks-auth"
        >
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={
                    <FullScreenLoader label="Loading please waite .."/>
                }>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}