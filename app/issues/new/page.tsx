"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="max-w-xl space-y-3"
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="description" {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
