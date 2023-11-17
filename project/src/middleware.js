// middleware.ts

import csrf from 'edge-csrf';
import { NextResponse, userAgent } from 'next/server';

// initalize protection function
const csrfProtect = csrf({
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function middleware(request) {
  const response = NextResponse.next();

  // csrf protection
  const csrfError = await csrfProtect(request, response);
  if(!request.cookies.get("_csrfSecret")){//if it's a bot or an api call, don't check csrf (API calls b/c they don't have cookies), we can also check the cookie header
    return response;  
    }
// check result
  if (csrfError) {
    console.log('invalid csrf token');
      return new NextResponse('invalid csrf token', { status: 403 });
  }
    
  return response;
}