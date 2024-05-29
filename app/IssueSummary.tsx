import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface StatusProps {
  label: string;
  value: number;
  status: Status;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const containers: StatusProps[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => {
        return (
          <Card key={container.label}>
            <Flex direction="column" gap="1">
              <Link
                href={`/issues?status=${container.status}`}
                className="text-sm font-medium"
              >
                {container.label}
              </Link>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
