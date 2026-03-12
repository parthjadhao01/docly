"use client";

import {ReactNode, useEffect, useMemo, useState} from "react";
import {
    LiveblocksProvider ,
    RoomProvider ,
    ClientSideSuspense
} from "@liveblocks/react/suspense";
import FullScreenLoader from "@/components/full-screen-loader";
import {useParams} from "next/navigation";
import {getUsers} from "@/app/documents/[documentId]/actions";
import {toast} from "sonner";

type User = {id : string, name : string, avatar : string}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    const [users,setUsers] = useState<User[]>([]);

    const fetchUsers = useMemo(
        () => async () => {
            try {
                const list = await getUsers();
                setUsers(list);
                console.log(list)
            }catch {
                toast.error("Failed to fetch  user");
            }
        },
        [],
    );

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint="/api/liveblocks-auth"
            resolveUsers={({userIds}) => {
                return userIds.map(
                    (userId)=>users.find((user)=> user.id === userId) ?? undefined
                )
            }}
            resolveMentionSuggestions={({text})=>{
                let filteredUser = users;
                if (text){
                    filteredUser = users.filter((user)=>{
                        user.name.toLowerCase().includes(text.toLowerCase())
                    })
                }
                return filteredUser.map((user) => user.id)
            }}
            resolveRoomsInfo={()=>[]}
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