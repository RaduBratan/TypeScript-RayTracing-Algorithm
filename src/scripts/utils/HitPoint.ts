import { Material } from "./Material";
import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export class HitPoint {
	isHit: boolean;
	position: Vector3;
	normal: Vector3;
	material: Material;
	distance: number;

	constructor (isHit: boolean, position?: Vector3, normal?: Vector3, ray?: Ray, material?: Material) {
		this.isHit = isHit;
		this.position = position;
		this.normal = normal;
		this.material = material;

		if (this.isHit)
			this.distance = position.distanceTo(ray.origin);
		else
			this.distance = 1e7;
	}
}
