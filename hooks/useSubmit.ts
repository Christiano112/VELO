import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultValues, Resolver, useForm, UseFormReturn } from "react-hook-form";
import { AnyObjectSchema } from "yup";

export const useSubmit = <T extends Record<string, any>>(
  schema: AnyObjectSchema,
  defaultValues: DefaultValues<T> | undefined
): UseFormReturn<T> => {
  const formHook = useForm<T>({
    resolver: yupResolver(schema) as Resolver<T>,
    defaultValues,
  });

  return formHook;
};
