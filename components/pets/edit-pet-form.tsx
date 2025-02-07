'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Pet } from '@/types/pet';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
  age: z.string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : null))
    .refine((val) => !val || (val >= 0 && val <= 100), {
      message: 'Age must be between 0 and 100',
    }),
  weight: z.string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : null))
    .refine((val) => !val || (val >= 0 && val <= 1000), {
      message: 'Weight must be between 0 and 1000',
    }),
});

type FormValues = {
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  age: string;
  weight: string;
};

interface EditPetFormProps {
  petId: string;
}

export function EditPetForm({ petId }: EditPetFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: pet, isLoading } = useQuery<Pet>({
    queryKey: ['pet', petId],
    queryFn: async () => {
      const response = await fetch(`/api/pets/${petId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pet');
      }
      return response.json();
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      breed: '',
      birthDate: '',
      age: '',
      weight: '',
    },
  });

  useEffect(() => {
    if (pet) {
      form.reset({
        name: pet.name,
        type: pet.type,
        breed: pet.breed || '',
        birthDate: pet.birth_date || '',
        age: pet.age?.toString() || '',
        weight: pet.weight?.toString() || '',
      });
    }
  }, [pet, form]);

  const updatePetMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to update pet');
      }

      return response.json();
    },
    onSuccess: () => {
      // Update both the list and individual pet data
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['pets'] }),
        queryClient.invalidateQueries({ queryKey: ['pet', petId] })
      ]);
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      // Convert empty strings to null for optional fields
      const payload = {
        ...data,
        breed: data.breed || null,
        birthDate: data.birthDate || null,
        age: data.age ? parseInt(data.age, 10) : null,
        weight: data.weight ? parseFloat(data.weight) : null,
      };
      
      await updatePetMutation.mutateAsync(payload);
      toast({
        title: 'Success',
        description: 'Pet updated successfully',
      });
    } catch (error) {
      console.error('Error updating pet:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update pet',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date (optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age (years)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="1" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.1" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting || updatePetMutation.isPending}
        >
          {(isSubmitting || updatePetMutation.isPending) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
