import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError);
      return new NextResponse('Authentication error', { status: 401 });
    }

    if (!user?.id) {
      console.error('No user ID found in session');
      return new NextResponse('Unauthorized - No user ID', { status: 401 });
    }

    const { name, breed, type, birthDate, age, weight } = await req.json();

    if (!name || !type) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const now = new Date().toISOString();
    const userId = user.id;

    console.log('Creating pet with user_id:', userId);

    // First try to insert
    const { data, error } = await supabase
      .from('pets')
      .insert({
        id: crypto.randomUUID(),
        name,
        type,
        breed: breed || null,
        birth_date: birthDate || null,
        age: age ? parseInt(age, 10) : null,
        weight: weight ? parseFloat(weight) : null,
        user_id: userId,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating pet:', error);
      if (error.code === '42501') {
        // RLS policy violation
        return new NextResponse(
          'Permission denied. Please make sure you are logged in.',
          { status: 403 }
        );
      }
      return new NextResponse(
        `Error creating pet: ${error.message} (${error.code})`,
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Error',
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError);
      return new NextResponse('Authentication error', { status: 401 });
    }

    if (!user?.id) {
      console.error('No user ID found in session');
      return new NextResponse('Unauthorized - No user ID', { status: 401 });
    }

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pets:', error);
      return new NextResponse(
        `Error fetching pets: ${error.message} (${error.code})`,
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Internal error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Error',
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError);
      return new NextResponse('Authentication error', { status: 401 });
    }

    if (!user?.id) {
      console.error('No user ID found in session');
      return new NextResponse('Unauthorized - No user ID', { status: 401 });
    }

    const userId = user.id;

    console.log('Deleting pet for user_id:', userId);

    const { searchParams } = new URL(req.url);
    const petId = searchParams.get('id');

    if (!petId) {
      return new NextResponse('Pet ID is required', { status: 400 });
    }

    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', petId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting pet:', error);
      return new NextResponse(
        `Error deleting pet: ${error.message} (${error.code})`,
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Internal error:', error);
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Error',
      { status: 500 }
    );
  }
}
