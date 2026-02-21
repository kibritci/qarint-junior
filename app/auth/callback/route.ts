import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** Allow only same-origin relative paths to prevent open redirect. */
function safeRedirectPath(next: string | null): string {
  const path = (next ?? '').trim() || '/';
  if (path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')) {
    return path;
  }
  return '/';
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeRedirectPath(searchParams.get('next'));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
