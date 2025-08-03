import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import * as React from 'react';
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
  Resolver,
} from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: ZodType<TFormValues, ZodTypeDef, TFormValues>;
};

export const Form = <TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues>) => {
  const resolver: Resolver<TFormValues> | undefined = schema
    ? zodResolver(schema as any)
    : undefined;

  const methods = useForm<TFormValues>({
    ...options,
    resolver,
  });

  return (
    <form
      className={clsx('', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
