import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/DAO";

export async function GET(request) {
  try {
    await connectToDB();

    const users = await User.find();

    return NextResponse.json({ users });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro buscando os usuários" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();

    const user = await User.create({
      ...body,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro criando o usuário" },
      { status: 500 }
    );
  }
}
