import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
};

const SearchBar = ({ onSubmit, placeHolder, onReset }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <div className="flex flex-row gap-3">
          <Search
            strokeWidth={2.5}
            size={30}
            className="ml-1 text-orange-500 hidden md:block"
          />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border-none shadow-none text-xl focus-visible:ring-0"
                    placeholder={placeHolder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-3">
          {form.formState.isDirty && (
            <Button
              onClick={handleReset}
              type="button"
              variant="outline"
              className="rounded-full"
            >
              Clear
            </Button>
          )}
          <Button type="submit" className="rounded-full bg-orange-500">
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;