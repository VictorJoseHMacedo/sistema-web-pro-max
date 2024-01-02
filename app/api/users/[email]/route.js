import User from "@/models/userModel";
import { connectToDB } from "@/utils/DAO";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    const user = await User.findOne({ email: params.email });

    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Ocorreu um erro buscando o usuário com email " + params.email,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectToDB();

    const body = await request.json();
    const user = await User.findOne({ email: params.email });

    for (const [key, value] of Object.entries(body)) {
      value ? (user[key] = value) : null;
    }

    user.updatedAt = Date.now();

    await user.save();

    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Ocorreu um erro alterando o usuário com email " + params.email,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();

    const user = await User.findOneAndDelete({ email: params.email });

    return new NextResponse(null, {status: 204});
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Ocorreu um erro excluindo o usuário com email " + params.email,
      },
      { status: 500 }
    );
  }
}
