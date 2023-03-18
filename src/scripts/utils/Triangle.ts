import { HitPoint } from "./HitPoint";
import { Vector3 } from "./Vector3";
import { Material } from "./Material";
import { Ray } from "./Ray";

export class Triangle {
	v1: Vector3;
	v2: Vector3;
	v3: Vector3;
	material: Material;

	constructor (v1: Vector3, v2: Vector3, v3: Vector3, material: Material) {
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		this.material = material;
	}

	normal(): Vector3 {
		const v2minusv1 = this.v2.vectorDiff(this.v1);
		const v3minusv1 = this.v3.vectorDiff(this.v1);
		return v2minusv1.vectorCross(v3minusv1).normalize();
	}

	intersectWith(ray: Ray): HitPoint {
		const v2minusv1 = this.v2.vectorDiff(this.v1);
		const v3minusv1 = this.v3.vectorDiff(this.v1);
		const denominator = ray.direction.vectorCross(v3minusv1).vectorDot(v2minusv1);
		const numerator = ray.origin.vectorDiff(this.v1).vectorCross(v2minusv1);
		const closestDistance = numerator.vectorDot(v3minusv1) / denominator;

		if (closestDistance < 0.0001)
			return new HitPoint(false);

		const position = ray.at(closestDistance);
		const normal = this.normal();
		const p1minusq = this.v1.vectorDiff(position);
		const p2minusq = this.v2.vectorDiff(position);
		const p3minusq = this.v3.vectorDiff(position);
		const A1 = 0.5 * ((p2minusq).vectorCross(p3minusq)).vectorDot(normal);
		const A2 = 0.5 * ((p3minusq).vectorCross(p1minusq)).vectorDot(normal);
		const A3 = 0.5 * ((p1minusq).vectorCross(p2minusq)).vectorDot(normal);
		const A = A1 + A2 + A3;
		const alpha = A1 / A;
		const beta = A2 / A;
		const gamma = A3 / A;

		if (alpha < 0 || beta < 0 || gamma < 0)
			return new HitPoint(false);
		return new HitPoint(true, position, this.normal(), ray, this.material);
	}
}
