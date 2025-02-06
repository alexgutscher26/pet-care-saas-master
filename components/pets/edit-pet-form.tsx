'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { type Pet } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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
        throw new Error('Failed to update pet');
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pet?.name || '',
      type: pet?.type || '',
      breed: pet?.breed || '',
      birthDate: pet?.birth_date || '',
    },
    values: {
      name: pet?.name || '',
      type: pet?.type || '',
      breed: pet?.breed || '',
      birthDate: pet?.birth_date || '',
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      await updatePetMutation.mutateAsync(data);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormLabel>Breed (Optional)</FormLabel>
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
              <FormLabel>Birth Date (Optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || updatePetMutation.isPending}
        >
          {(isSubmitting || updatePetMutation.isPending) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Pet'
          )}
        </Button>
      </form>
    </Form>
  );
}
