class AvtarService {
    static STYLES = [
        'adventurer',
        'adventurer-neutral',
        'avataaars',
        'avataaars-neutral',
        'big-ears',
        'big-ears-neutral',
        'big-smile',
        'bottts',
        'croodles',
        'croodles-neutral',
        'fun-emoji',
        'icons',
        'identicon',
        'initials',
        'lorelei',
        'lorelei-neutral',
        'micah',
        'miniavs',
        'notionists',
        'notionists-neutral',
        'open-peeps',
        'pixel-art',
        'pixel-art-neutral',
        'shapes',
        'thumbs'
    ];

    static COLORS_CODES = [
        "FFFFFF", // Pure White
        "FAFAFA", // Lightest Gray
        "F4F4F4", // Whisper Gray
        "E8E8E8", // Soft Silver Gray
        "FFEFEF", // Soft Blush Pink
        "FFF8E1", // Creamy White
        "E3F2FD", // Light Sky Blue
        "E8F5E9", // Minty Green
        "FFF3E0", // Soft Peach
        "FCE4EC", // Light Pink Mist
        "E1F5FE", // Icy Blue
        "F9FBE7", // Pale Lemon
        "F5F5F5", // Soft Neutral Gray
        "FFEBEE", // Rose Quartz
        "FFFDE7", // Light Butter Yellow
        "F3E5F5", // Lavender Mist
        "F1F8E9", // Pale Spring Green
        "FBE9E7", // Light Coral Peach
        "FFF9C4", // Light Pastel Yellow
    ];

    /**
     * Generates a Dicebear avatar URL
     * @param {Object} options - Configuration options for the avatar
     * @param {string} [options.seed] - Seed for generating consistent avatars (e.g., user's email or username)
     * @param {string} [options.style='avataaars'] - Avatar style from AvtarService.STYLES
     * @param {number} [options.size=128] - Size of the avatar in pixels
     * @param {string} [options.backgroundColor] - Background color in hex format (without #)
     * @param {string} [options.radius] - Border radius (0-50 for percentage)
     * @returns {string} Generated avatar URL
     * @throws {Error} If invalid style is provided
     */
    generateAvatar({
        seed = Math.random().toString(36).substring(7),
        style = AvtarService.STYLES[Math.floor(Math.random() * AvtarService.STYLES.length)],
        size = 128,
        backgroundColor,
        radius
    } = {}) {
        if (!AvtarService.STYLES.includes(style)) {
            throw new Error(`Invalid style. Available styles: ${AvtarService.STYLES.join(', ')}`);
        }

        // Build URL
        let url = `https://api.dicebear.com/9.x/${style}/svg`;

        // Build query parameters
        const params = new URLSearchParams();
        params.append('seed', seed);
        params.append('size', size);

        if (backgroundColor) {
            params.append('backgroundColor', backgroundColor);
        }

        if (radius) {
            params.append('radius', radius);
        }

        // Return complete URL
        return `${url}?${params.toString()}`;
    }

    /**
    * Generate a random avatar URL
    * @param {Object} options Avatar generation options
    * @returns {string} Random avatar URL
    */
    generateRandomAvatar(options = {}) {
        return this.generateAvatar({
            ...options,
            identifier: Math.random().toString(36).substring(7)
        });
    }

    /**
     * Generates a random color code
     * @returns {string} Random color code
     */
    generateRandomColor() {
        return AvtarService.COLORS_CODES[Math.floor(Math.random() * AvtarService.COLORS_CODES.length)];
    }
}

export default new AvtarService();