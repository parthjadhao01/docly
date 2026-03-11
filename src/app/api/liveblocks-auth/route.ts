import {Liveblocks} from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";
import {auth,currentUser} from "@clerk/nextjs/server";
import {api} from "../../../../convex/_generated/api";

type SessionClaimsWithOrg = {
    o?: {
        id: string;
        rol?: string;
        slg?: string;
    };
};

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
    secret : process.env.LIVEBLOCKS_SECRET_KEY!
})

export async function POST(req : Request){
    const {sessionClaims} = await auth();
    if (!sessionClaims){
        return new Response(
            "Unauthorized from session claims",
            { status : 401})
    }

    const claims = sessionClaims as SessionClaimsWithOrg;
    const user = await currentUser();
    if (!user){
        return new Response("Unauthorized from user not found",{status : 401})
    }

    const {room} = await req.json()
    const document = await convex.query(api.documents.getById,{id : room})

    if (!document){
        return new Response("Unauthorized from document not found",{status : 401})
    }

    const isOwner = document.ownerId === user.id;
    const isOrganizationMember = (document.organizationId && document.organizationId === claims.o?.id);

    console.log(document.organizationId);

    console.log("isOwner",isOwner);
    console.log("isOrganizatioinMember",isOrganizationMember);

    if (!isOwner && !isOrganizationMember){
        return new Response("Unauthorized form ownership",{status : 401});
    }

    const session = liveblocks.prepareSession(user.id,{
        userInfo : {
            name : user.fullName ?? "Anonymous",
            avatar : user.imageUrl
        }
    });
    session.allow(room,session.FULL_ACCESS);
    const {body,status} = await session.authorize();

    return new Response(body,{status})
}