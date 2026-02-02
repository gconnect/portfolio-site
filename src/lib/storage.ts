import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Safely read a JSON file
 */
export async function readJSONFile<T>(filename: string): Promise<T> {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new Error(`File not found: ${filename}`);
        }
        throw error;
    }
}

/**
 * Safely write to a JSON file with atomic writes
 */
export async function writeJSONFile<T>(filename: string, data: T): Promise<void> {
    const filePath = path.join(DATA_DIR, filename);
    const tempPath = `${filePath}.tmp`;

    try {
        // Write to temporary file first
        await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');

        // Atomically rename temp file to actual file
        await fs.rename(tempPath, filePath);
    } catch (error) {
        // Clean up temp file if it exists
        try {
            await fs.unlink(tempPath);
        } catch {
            // Ignore cleanup errors
        }
        throw error;
    }
}

/**
 * Update a JSON file with a transformation function
 */
export async function updateJSONFile<T>(
    filename: string,
    updateFn: (data: T) => T
): Promise<T> {
    const data = await readJSONFile<T>(filename);
    const updated = updateFn(data);
    await writeJSONFile(filename, updated);
    return updated;
}

/**
 * Check if admin username is authorized
 */
export async function isAdminAuthorized(username: string): Promise<boolean> {
    try {
        const config = await readJSONFile<{ admins: string[] }>('admin-config.json');
        return config.admins.includes(username);
    } catch {
        return false;
    }
}
