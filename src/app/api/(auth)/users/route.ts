import connect from "@/lib/db"
import User from "@/lib/models/User";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
    try {
        await connect();
        const user = await User.find();
        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (error: any) {
        return new NextResponse('error in fatching user' + error.message, { status: 500 })
    }
}


export const POST = async (request: Request) => {

    try {
        const newUserData = await request.json();
        // console.log(newUserData)
        await connect();
        const newUser = new User(newUserData);
        await newUser.save()
        return new NextResponse(JSON.stringify({ message: "new user added", user: newUser }), { status: 200 })
    } catch (error: any) {
        return new NextResponse('error in fatching user' + error.message, { status: 500 })
    }
}


export const PATCH = async (request: Request) => {
   try {
     const userUpdateData = await request.json();
    const { userId, userName } = userUpdateData;
    console.log(userId, userName)
    if (!userId, !userName) {
        return new NextResponse(JSON.stringify({ message: "userid or userName not found" }), { status: 400 })
    }
    if (!Types.ObjectId.isValid(userId)) {
        return new NextResponse(JSON.stringify({ message: "user id not valid" }), { status: 400 })
    }

    const updateUser = await User.findByIdAndUpdate(
        { _id: new ObjectId(userId) },
        { userName: userName },
        { new: true }
    );

    if (!updateUser) {
        return new NextResponse(JSON.stringify({ message: "cannt update the username" }), { status: 400 })
    }

    return new NextResponse(JSON.stringify({ message: " username updated successfully" }), { status: 400 })
   } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: " error in updateing user name" }), { status: 400 })
   }
}

