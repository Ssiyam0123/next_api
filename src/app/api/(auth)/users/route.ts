import connect from "@/lib/db"
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const user = await User.find();
        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (error: any) {
        return new NextResponse('error in fatching user' + error.message, { status: 500 })
    }

}