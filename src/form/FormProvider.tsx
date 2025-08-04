import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import { FormProvider as RHFFormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProviderProps {
  schema: z.ZodSchema;
  defaultValues?: any;
  onSubmit: (data: any) => void | Promise<void>;
  children: React.ReactNode;
}

interface FormContextValue {
  handleSubmit: () => void;
  methods: UseFormReturn<any>;
}

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
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

  const handleSubmit = () => {
    methods.handleSubmit(onSubmit)();
  };

  const contextValue: FormContextValue = {
    handleSubmit,
    methods,
  };

  return (
    <RHFFormProvider {...methods}>
      <FormContext.Provider value={contextValue}>
        <View>
          {children}
        </View>
      </FormContext.Provider>
    </RHFFormProvider>
  );
}