"use server"

import {auth, clerkClient} from "@clerk/nextjs/server";

export async function getUsers(){
    console.log("function get user calling")
    const { sessionClaims } = await auth();
    const clerk = await clerkClient();
    const response = await clerk.users.getUserList({
        // @ts-ignore
        organizationId : [sessionClaims?.o?.id as string]
    })

    console.log("users",response)

    return response.data.map((user) => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl
    }));
}