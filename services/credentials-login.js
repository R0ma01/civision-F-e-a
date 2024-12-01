'use server';
import { signIn, signOut } from '@/auth';
import { auth } from '@/auth';
export async function credentialsSignIn(credentials) {
    console.log(credentials);
    await signIn('credentials', {
        ...credentials,
        redirectTo: '/thematiques',
        redirect: true,
    });
}

export async function getAuthSession() {
    const session = await auth();
    return session;
}

export async function credentialsLogout() {
    console.log('hello');
    await signOut();
}
