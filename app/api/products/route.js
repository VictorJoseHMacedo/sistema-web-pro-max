import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDB } from "@/utils/DAO";
import Product from "@/models/productModel";
import { getServerSession } from "next-auth";

export async function GET(request) {
  try {
    await connectToDB();

    const products = await Product.find();

    return NextResponse.json({ products });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro buscando os produtos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const body = await request.json();

    const session = await getServerSession();
    const user = await User.findOne({ email: session.user?.email });

    const product = await Product.create({
      ...body,
      user: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro adicionando o produto" },
      { status: 500 }
    );
  }
}
