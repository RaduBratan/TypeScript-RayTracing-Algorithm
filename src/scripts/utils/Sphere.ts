import { HitPoint } from "./HitPoint";
import { Material } from "./Material";
import { Ray } from "./Ray";
import { Vector3 } from "./Vector3";

export class Sphere {
	center: Vector3;
	radius: number;
	material: Material;

	constructor (center: Vector3, radius: number, material: Material) {
		this.center = center;
		this.radius = radius;
		this.material = material;
	}

	intersectWith(ray: Ray): HitPoint {
		const a = 1;
		const rayToCenter = ray.origin.vectorDiff(this.center);
		const b = 2 * ray.direction.vectorDot(rayToCenter);
		const c = rayToCenter.vectorDot(rayToCenter) - this.radius * this.radius;
		const discriminant = b * b - 4 * a * c;
		if (discriminant <= 0)
			return new HitPoint(false);

		let closestDistance = 0;
		const distance1 = (-1 * b + Math.sqrt(discriminant)) / 2;
		const distance2 = (-1 * b - Math.sqrt(discriminant)) / 2;

		if ((distance1 < 0) && (distance2 < 0))
			return new HitPoint(false);
		else if (distance2 < 0)
			closestDistance = distance1;
		else
			closestDistance = Math.min(distance1, distance2);

		const position = ray.at(closestDistance);
		const normal = (position.vectorDiff(this.center)).scalarDiv(this.radius);

		return new HitPoint(true, position, normal, ray, this.material);

		/* const L = this.center.vectorDiff(ray.origin);
		const tca = L.vectorDot(ray.direction);
		if (tca < 0)
			return new HitPoint(false);
		const d2 = L.vectorDot(L) - tca * tca;
		if (d2 > this.radius * this.radius)
			return new HitPoint(false);
		const thc = Math.sqrt(this.radius * this.radius - d2);
		let t0 = tca - thc;
		let t1 = tca + thc;
		if (t0 > t1) {
			t0 ^= t1;
			t1 ^= t0;
			t0 ^= t1;
		}
		if (t0 < 0) {
			t0 = t1;
			if (t0 < 0)
				return new HitPoint(false);
		}
		const t = t0;
		const position = ray.at(t);
		const normal = (position.vectorDiff(this.center)).scalarDiv(this.radius);
		return new HitPoint(true, position, normal, ray, this.material); */
	}
}
