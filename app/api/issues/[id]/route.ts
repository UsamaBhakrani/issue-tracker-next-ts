import { createIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: {
    id: string;
  };
}

export const GET = async (request: NextRequest, { params }: ParamsProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Item Not Present" }, { status: 400 });
  }

  return NextResponse.json(issue, { status: 200 });
};

export const PUT = async (request: NextRequest, { params }: ParamsProps) => {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Item does not Exist" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(updatedIssue, { status: 201 });
};

export const DELETE = async (request: NextRequest, { params }: ParamsProps) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Item does not Exist" }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json( deletedIssue , { status: 200 });
};
