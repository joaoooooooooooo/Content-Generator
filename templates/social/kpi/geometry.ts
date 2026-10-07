// Shape equations from the supplied ParticleCloud; seeded for repeatable frames.
let seed = 73421;
function random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }

export function createPositions(shapeType: string, count: number) {
    seed = 73421
    switch (shapeType) {
        case "TorusKnot":
            return createTorusKnotPositions(count)

        case "Torus":
            return createTorusPositions(count)

        case "Icosahedron":
            return createIcosahedronPositions(count)

        case "Sphere":
            return createSpherePositions(count)

        case "Box":
            return createBoxPositions(count)

        case "MobiusStrip":
            return createMobiusStripPositions(count)

        case "TrefoilKnot":
            return createTrefoilKnotPositions(count)

        case "Cloud":
        default:
            return createCloudPositions(count)
    }
}

function createTorusPositions(count: number, radius = 4, tubeRadius = 1) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const theta = random() * Math.PI * 2

        const phi = random() * Math.PI * 2

        const index = i * 3

        positions[index] =
            (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta)

        positions[index + 1] =
            (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta)

        positions[index + 2] = tubeRadius * Math.sin(phi)
    }

    return positions
}

function createIcosahedronPositions(count: number, radius = 5) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const theta = random() * Math.PI * 2

        const phi = Math.acos(2 * random() - 1)

        const index = i * 3

        positions[index] = radius * Math.sin(phi) * Math.cos(theta)

        positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta)

        positions[index + 2] = radius * Math.cos(phi)
    }

    return positions
}

function createSpherePositions(count: number, radius = 5) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const theta = random() * Math.PI * 2

        const phi = Math.acos(2 * random() - 1)

        const index = i * 3

        positions[index] = radius * Math.sin(phi) * Math.cos(theta)

        positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta)

        positions[index + 2] = radius * Math.cos(phi)
    }

    return positions
}

function createBoxPositions(count: number, size = 6) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const index = i * 3

        positions[index] = (random() - 0.5) * size

        positions[index + 1] = (random() - 0.5) * size

        positions[index + 2] = (random() - 0.5) * size
    }

    return positions
}

function createCloudPositions(
    count: number,
    tubeRadius = 1.7,
    tube = 3,
    p = 2.1,
    q = 1
) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const theta = random() * Math.PI * 2

        const phi = random() * Math.PI * 2

        const index = i * 3

        const cosQTheta = Math.cos(q * phi)

        const sinQTheta = Math.sin(q * theta)

        const cosPTheta = Math.cos(p * theta)

        const sinPTheta = Math.sin(p * theta)

        positions[index] = (tubeRadius + tube * cosQTheta) * cosPTheta

        positions[index + 1] = (tubeRadius + tube * cosQTheta) * sinPTheta

        positions[index + 2] = tube * sinQTheta
    }

    return positions
}

function createTorusKnotPositions(
    count: number,
    tubeRadius = 1.7,
    tube = 3,
    p = 3,
    q = 3
) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const theta = random() * Math.PI * 2

        const phi = random() * Math.PI * 2

        const index = i * 3

        const cosQTheta = Math.cos(q * phi)

        const sinQTheta = Math.sin(q * theta)

        const cosPTheta = Math.cos(p * theta)

        const sinPTheta = Math.sin(p * theta)

        positions[index] = (tubeRadius + tube * cosQTheta) * cosPTheta

        positions[index + 1] = (tubeRadius + tube * cosQTheta) * sinPTheta

        positions[index + 2] = tube * sinQTheta
    }

    return positions
}

function createMobiusStripPositions(count: number, radius = 3, width = 4) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const u = random() * Math.PI * 2

        const v = (random() - 0.5) * width

        const index = i * 3

        positions[index] = (radius + v * Math.cos(u / 2)) * Math.cos(u)

        positions[index + 1] = (radius + v * Math.cos(u / 2)) * Math.sin(u)

        positions[index + 2] = v * Math.sin(u / 2)
    }

    return positions
}

function createTrefoilKnotPositions(count: number, scale = 1.4) {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const t = random() * Math.PI * 2

        const index = i * 3

        const x = Math.sin(t) + 2 * Math.sin(2 * t)

        const y = Math.cos(t) - 2 * Math.cos(2 * t)

        const z = -Math.sin(3 * t)

        positions[index] = x * scale
        positions[index + 1] = y * scale
        positions[index + 2] = z * scale
    }

    return positions
}

