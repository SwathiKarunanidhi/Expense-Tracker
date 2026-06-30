import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { BudgetItem } from "../../../lib/types";

const filePath = path.join(process.cwd(), "data", "budget.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  const newItem = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data.push(newItem);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: Request) {
  const updatedItem = await req.json();
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.map((item: BudgetItem) =>
    item.id === updatedItem.id ? updatedItem : item,
  );
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(updatedItem, { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.filter((item: BudgetItem) => item.id !== Number(id));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({}, { status: 200 });
}
