import { Vector3 } from "./Vector3";

export class Ray {
	origin: Vector3;
	direction: Vector3;

	constructor (origin: Vector3, direction: Vector3) {
		this.origin = origin;
		this.direction = direction;
	}

	at(scalar: number): Vector3 {
		return this.origin.vectorSum(this.direction.scalarMult(scalar));
	}
}
