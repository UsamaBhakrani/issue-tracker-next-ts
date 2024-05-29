"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { Issue, Status } from "@prisma/client";
import prisma from "@/prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

interface Statuses {
  label: string;
  status: Status;
}
const IssueStatusSelect = ({ issueId }: { issueId: number }) => {
  const containers: Statuses[] = [
    { label: "Open", status: "OPEN" },
    { label: "Closed", status: "CLOSED" },
    { label: "In Progress", status: "IN_PROGRESS" },
  ];

  const assignStatus = async (status: Status) => {
    try {
      await axios.patch("/api/issues/" + issueId, { status });
    } catch (error) {
      toast.error("Status could not be changed");
    }
  };

  return (
    <Select.Root onValueChange={assignStatus}>
      <Select.Trigger placeholder="Assign Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {containers?.map((container: Statuses) => {
            return (
              <Select.Item key={container.label} value={container.status}>
                {container.label}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusSelect;
