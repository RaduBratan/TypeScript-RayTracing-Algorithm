import { Vector3 } from "./Vector3";
import { Color } from "./Color";

export class PointLight {
	position: Vector3;
	power: Color;
	attenuation: Vector3;

	constructor (position: Vector3, power: Color, attenuation: Vector3) {
		this.position = position;
		this.power = power;
		this.attenuation = attenuation;
	}

	distanceTo(point: Vector3): number {
		return this.position.distanceTo(point);
	}

	intensityAt(point: Vector3): Color {
		const distance = this.distanceTo(point);
		const intensity = this.power.scalarDiv((this.attenuation.x) + (this.attenuation.y * distance) + (this.attenuation.z * distance * distance));
		return intensity;
	}
}
