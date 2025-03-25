export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

export function splitSignature(signature: string) {
    let [r, s, v] = [
        signature.slice(0, 32),
        signature.slice(32, 64),
        parseInt(signature.slice(64, 65), 16),
    ];

    if (v < 27) {
        v += 27;
    }

    return { r, s, v };
}
