import { Material } from "./Material";
import { Vector3 } from "./Vector3";
import { HitPoint } from "./HitPoint";
import { Ray } from "./Ray";

export class Cube {
	b0: Vector3;
	b1: Vector3;
	material: Material;

	constructor (b0: Vector3, b1: Vector3, material: Material) {
		this.b0 = b0;
		this.b1 = b1;
		this.material = material;
	}

	normal(): Vector3 {
		const b0plusb1 = this.b0.vectorSum(this.b1).normalize();
		return b0plusb1;
	}

	intersectWith(ray: Ray): HitPoint {
		const bounds: Array<Vector3> = [];
		bounds[0] = this.b0;
		bounds[1] = this.b1;

		const sign: Array<number> = [];
		const invDirection = ray.direction.inverse();
		sign[0] = (invDirection.x < 0) === true ? 1 : 0;
		sign[1] = (invDirection.y < 0) === true ? 1 : 0;
		sign[2] = (invDirection.z < 0) === true ? 1 : 0;

		let tmin = (bounds[sign[0]].x - ray.origin.x) * invDirection.x;
		let tmax = (bounds[1 - sign[0]].x - ray.origin.x) * invDirection.x;
		const tymin = (bounds[sign[1]].y - ray.origin.y) * invDirection.y;
		const tymax = (bounds[1 - sign[1]].y - ray.origin.y) * invDirection.y;
		const tzmin = (bounds[sign[2]].z - ray.origin.z) * invDirection.z;
		const tzmax = (bounds[1 - sign[2]].z - ray.origin.z) * invDirection.z;

		if ((tmin > tymax) || (tymin > tmax))
			return new HitPoint(false);

		if (tymin > tmin)
			tmin = tymin;
		if (tymax < tmax)
			tmax = tymax;

		if ((tmin > tzmax) || (tzmin > tmax))
			return new HitPoint(false);

		if (tzmin > tmin)
			tmin = tzmin;
		if (tzmax < tmax)
			tmax = tzmax;

		let closestDistance = tmin;
		if (closestDistance < 0) {
			closestDistance = tmax;
			if (closestDistance < 0)
				return new HitPoint(false);
		}
		const position = ray.at(closestDistance);
		return new HitPoint(true, position, this.normal(), ray, this.material);
	}
}