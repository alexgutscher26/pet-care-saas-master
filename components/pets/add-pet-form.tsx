'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().optional(),
  birthDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddPetForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      breed: '',
      birthDate: '',
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);

      // Convert empty strings to null for optional fields
      const payload = {
        name: data.name,
        type: data.type,
        breed: data.breed || null,
        birthDate: data.birthDate || null,
      };

      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 403) {
          throw new Error('Permission denied. Please make sure you are logged in.');
        }
        throw new Error(errorText || 'Failed to add pet');
      }

      const newPet = await response.json();
      
      // Show success message
      toast({
        title: 'Success',
        description: 'Pet added successfully',
      });

      // Invalidate pets query to refresh the list
      await queryClient.invalidateQueries({ queryKey: ['pets'] });

      // Reset form
      form.reset();

      // Redirect to pets list
      router.push('/pets');
    } catch (error) {
      console.error('Error adding pet:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add pet',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border rounded-xl shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add a New Pet</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter pet name" 
                      {...field} 
                      className="rounded-lg"
                    />
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
                  <FormLabel>Pet Type</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Dog, Cat, Bird" 
                      {...field} 
                      className="rounded-lg"
                    />
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
                    <Input 
                      placeholder="Enter breed" 
                      {...field} 
                      className="rounded-lg"
                    />
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
                    <Input 
                      type="date" 
                      {...field} 
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Pet'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
