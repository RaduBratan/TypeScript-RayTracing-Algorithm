export class Vector3 {
	x: number;
	y: number;
	z: number;

	constructor (x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	scalarMult(scalar: number): Vector3 {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
	}

	scalarDiv(scalar: number): Vector3 {
		return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
	}

	vectorSum(vector: { x: number; y: number; z: number; }): Vector3 {
		return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
	}

	vectorDiff(vector: { x: number; y: number; z: number; }): Vector3 {
		return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
	}

	vectorDot(vector: this): number {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	}

	vectorCross(vector: { z: number; y: number; x: number; }): Vector3 {
		return new Vector3(this.y * vector.z - this.z * vector.y,
			this.z * vector.x - this.x * vector.z,
			this.x * vector.y - this.y * vector.x);
	}

	inverse(): Vector3 {
		return new Vector3(1 / this.x, 1 / this.y, 1 / this.z);
	}

	length(): number {
		return Math.sqrt(this.vectorDot(this));
	}

	distanceTo(vector: this): number {
		return (vector.vectorDiff(this)).length();
	}

	normalize(): Vector3 {
		const length = this.length();
		return new Vector3(this.x / length, this.y / length, this.z / length);
	}
}
