import { NextResponse } from 'next/server';
import { verifyToken, verifyAdminToken } from '@/utils/token-utils'; // Ensure verifyAdminToken is imported
import { PagePaths } from './components/enums/page-paths-enum';

// export async function middleware(request) {
//     // Only run middleware in production, NODE_ENV is automatically set to production when deployed
//     if (process.env.NODE_ENV !== 'production') {
//         return NextResponse.next();
//     }

//     const token = request.cookies.get('token')?.value || '';
//     const adminToken = request.cookies.get('adminToken')?.value || '';

//     try {
//         // Check for admin route
//         if (request.nextUrl.pathname.startsWith(PagePaths.ADMIN)) {
//             const isAdminValid = await verifyAdminToken(adminToken);
//             if (!isAdminValid) {
//                 console.log('Redirecting to login due to invalid admin token');
//                 return NextResponse.redirect(
//                     new URL(PagePaths.LOGIN, request.url),
//                 );
//             }
//         } else if (request.nextUrl.pathname.startsWith(PagePaths.REPERTOIRE)) {
//             const isValid = await verifyToken(token);
//             if (!isValid) {
//                 console.log('Redirecting to login due to invalid token');
//                 return NextResponse.redirect(
//                     new URL(PagePaths.LOGIN, request.url),
//                 );
//             }
//         } else if (
//             request.nextUrl.pathname.startsWith(PagePaths.RECHERCHE_ACADEMIQUE)
//         ) {
//             const isValid = await verifyToken(token);
//             if (!isValid) {
//                 console.log('Redirecting to login due to invalid token');
//                 return NextResponse.redirect(
//                     new URL(PagePaths.LOGIN, request.url),
//                 );
//             }
//         }
//     } catch (err) {
//         console.log('Redirecting to login due to error:', err);
//         return NextResponse.redirect(new URL(PagePaths.LOGIN, request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         '/repertoire/:path*',
//         '/admin/:path*',
//         '/recherche-academique/:path*',
//     ],
// };

export const config = {
    matcher: [
        '/repertoire/:path*',
        '/admin/:path*',
        '/recherche-academique/:path*',
    ],
};

// Ensure the middleware runs for the specified paths
export { auth as middleware } from '@/auth';
