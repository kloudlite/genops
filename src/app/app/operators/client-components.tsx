"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOperator } from "@/server-functions/operators";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const OperatorDeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <DropdownMenuItem
          className="text-destructive"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Operator</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this operator?
        </DialogDescription>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteOperator(id);
              router.refresh();
            }}
          >
            Delete
          </Button>
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
