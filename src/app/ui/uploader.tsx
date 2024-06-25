import React, { useEffect, useRef } from "react";
import { useFieldArray, Controller, Control, Field } from "react-hook-form";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { productSchema } from "../zod/schema";

const Uploader = ({
  setValue,
  children,
  control,
  ...props
}: {
  setValue: (uploads: any) => void;
  control: any;
} & React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
    keyName: "documentId",
  });

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const onAddDocuments = () => {
    hiddenFileInput.current?.click();
  };

  const handleAddDocuments = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) return;
    const files = Array.from(event.currentTarget.files).map((file) => ({
      file,
    }));
    append(files);
    if (hiddenFileInput.current) hiddenFileInput.current.value = "";
  };

  useEffect(() => {
    setValue(fields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length]);

  return (
    <div className="flex flex-col">
      {fields.length > 0 && (
        <ScrollArea className="h-36 w-full rounded-md border p-2 mb-1">
          <h4 className="mb-4 text-sm font-medium leading-none">Uploads</h4>
          {/* @ts-expect-error */}
          {fields.map(({ documentId, file }, index) => (
            <React.Fragment key={documentId}>
              <Controller
                control={control}
                name={`documents.${index}`}
                render={() => (
                  <div
                    key={file.name}
                    className="text-sm flex justify-between items-center border-b border-gray-300"
                  >
                    <span className="px-1 flex-grow-0">{index + 1}</span>
                    <span className="px-1 flex-grow">{file.name}</span>
                    <Button
                      variant={"link"}
                      aria-label="Remove"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              />
            </React.Fragment>
          ))}
        </ScrollArea>
      )}
      <input
        hidden
        ref={hiddenFileInput}
        type="file"
        multiple
        onChange={handleAddDocuments}
      />
      <FormField
        control={control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <button
              {...field}
              type="button"
              onClick={onAddDocuments}
              {...props}
            >
              {children}
            </button>
            <FormMessage>{control._formState.errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};

export default Uploader;
