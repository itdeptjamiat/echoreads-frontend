import React from 'react';
import { FormProvider as RHFFormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProviderProps {
  schema: z.ZodSchema;
  defaultValues?: any;
  onSubmit: (data: any) => void | Promise<void>;
  children: React.ReactNode;
}

export function FormProvider({
  schema,
  defaultValues,
  onSubmit,
  children,
}: FormProviderProps) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </RHFFormProvider>
  );
}