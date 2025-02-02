import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function signOut() {
  // Clerk stores session in `__session` cookie, so we delete it
  (await cookies()).delete('__session');

  // Redirect user to sign-in page or home page
  redirect('/sign-in'); // Change path as needed
}
