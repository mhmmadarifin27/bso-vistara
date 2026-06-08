import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    // Melakukan query sederhana untuk menjaga koneksi database tetap aktif
    // Ini mencegah Supabase melakukan pause pada project karena inactivity
    const { data, error } = await supabase
      .from('pengurus_frames')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error pinging database:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database pinged successfully to prevent Supabase suspension.',
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    console.error('Unexpected error during keep-alive ping:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
