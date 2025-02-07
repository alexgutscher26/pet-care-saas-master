import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { petId: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { petId } = params;
    const { name, type, breed, birthDate, age, weight } = await req.json();

    // First verify the pet belongs to the user
    const { data: existingPet, error: fetchError } = await supabase
      .from('pets')
      .select()
      .eq('id', petId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingPet) {
      return new NextResponse('Pet not found', { status: 404 });
    }

    const { data, error } = await supabase
      .from('pets')
      .update({
        name,
        type,
        breed: breed || null,
        birth_date: birthDate || null,
        age: age || null,
        weight: weight || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', petId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pet:', error);
      return new NextResponse(error.message, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { petId: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { petId } = params;

    const { data, error } = await supabase
      .from('pets')
      .select()
      .eq('id', petId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching pet:', error);
      return new NextResponse(error.message, { status: 500 });
    }

    if (!data) {
      return new NextResponse('Pet not found', { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { petId: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { petId } = params;

    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', petId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting pet:', error);
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Internal error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
