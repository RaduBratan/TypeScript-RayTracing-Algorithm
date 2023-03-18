import { HitPoint } from "./HitPoint";
import { Vector3 } from "./Vector3";
import { Material } from "./Material";
import { Ray } from "./Ray";

export class Plane {
	center: Vector3;
	v1: Vector3;
	v2: Vector3;
	material: Material;

	constructor (center: Vector3, v1: Vector3, v2: Vector3, material: Material) {
		this.center = center;
		this.v1 = v1;
		this.v2 = v2;
		this.material = material;
	}

	normal(): Vector3 {
		const v2plusv1 = this.v2.vectorSum(this.v1).normalize();
		return v2plusv1;
	}

	intersectWith(ray: Ray): HitPoint {
		const v2plusv1 = this.v2.vectorSum(this.v1);
		const rayToCenter = this.center.vectorDiff(ray.origin);
		const denominator = v2plusv1.vectorDot(ray.direction);
		const numerator = rayToCenter.vectorDot(v2plusv1);
		const closestDistance = numerator / denominator;
		const position = ray.at(closestDistance);

		if (closestDistance < 0.0001)
			return new HitPoint(false);
		return new HitPoint(true, position, this.normal(), ray, this.material);
	}
}