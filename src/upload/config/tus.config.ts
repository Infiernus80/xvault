const DEFAULT_TUS_UPLOAD_PATH = '/upload/uploads';
const DEFAULT_TUS_FILES_DIRECTORY = './files';

export function getTusUploadPath(): string {
	const configuredPath = process.env.TUS_UPLOAD_PATH?.trim();

	if (!configuredPath) {
		return DEFAULT_TUS_UPLOAD_PATH;
	}

	return configuredPath.startsWith('/')
		? configuredPath
		: `/${configuredPath}`;
}

export function getTusFilesDirectory(): string {
	const configuredDirectory = process.env.TUS_FILES_DIRECTORY?.trim();

	if (!configuredDirectory) {
		return DEFAULT_TUS_FILES_DIRECTORY;
	}

	return configuredDirectory;
}

export function getTusAllowedOrigins(): string[] | undefined {
	const configuredOrigins = process.env.TUS_ALLOWED_ORIGINS?.trim();

	if (!configuredOrigins) {
		return undefined;
	}

	const origins = configuredOrigins
		.split(',')
		.map(origin => origin.trim())
		.filter(Boolean);

	return origins.length > 0 ? origins : undefined;
}
