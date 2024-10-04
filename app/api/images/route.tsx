import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const directoryPath = path.join(
        process.cwd(),
        'public',
        'images',
        'drop-down-images',
    );

    try {
        const files = fs.readdirSync(directoryPath).filter((file) => {
            // Filter out non-image files (optional, add more extensions as needed)
            return (
                file.endsWith('.jpg') ||
                file.endsWith('.png') ||
                file.endsWith('.jpeg') ||
                file.endsWith('.gif')
            );
        });

        const imagePaths = files.map(
            (file) => `/images/drop-down-images/${file}`,
        );
        return NextResponse.json({
            message: 'Data field found successfully',
            images: imagePaths,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to load Images',
        });
    }
}
