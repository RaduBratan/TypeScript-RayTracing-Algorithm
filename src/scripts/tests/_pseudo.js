class Vector3 {
	x: number;
	y: number;
	z: number;

	constructor(x, y, z) {
		this.x = x; // coordonata x a vectorului
		this.y = y; // coordonata y a vectorului
		this.z = z; // coordonata z a vectorului
	}

	inmultirea_cu_un_scalar(s) { }
	impartirea_cu_un_scalar(s) { }
	suma_dintre_doi_vectori(v) { }
	diferenta_dintre_doi_vectori(v) { }
	produsul_scalar_a_doi_vectori(v) { }
	produsul_vectorial_a_doi_vectori(vectorNou) {
		return new Vector3(
			vectorCurent.y * vectorNou.z - vectorCurent.z * vectorNou.y,
			vectorCurent.z * vectorNou.x - vectorCurent.x * vectorNou.z,
			vectorCurent.x * vectorNou.y - vectorCurent.y * vectorNou.x);
	}
	lungimea_vectorului() { }
	distanta_dintre_doi_vectori(v) { }
}

class Color {
	r: number;
	g: number;
	b: number;

	constructor(r, g, b) {
		this.r = r; // culoarea rosie a unui pixel
		this.g = g; // culoarea verde a unui pixel
		this.b = b; // culoarea albastra a unui pixel
	}
}

class Ray {
	origin: Vector3;
	direction: Vector3;

	constructor(origin, direction) {
		this.origin = origin; // originea razei
		this.direction = direction; // directia razei
	}
}

class HitPoint {
	isHit: boolean; position: Vector3;
	normal: Vector3; material: Material;
	distance: number;

	constructor(isHit, position, normal, ray, material) {
		// verificam daca suprafata se intersecteaza cu raza de lumina
		this.isHit = isHit;
		// pozitia in spatiu a punctului de intersectie
		this.position = position;
		// normala
		this.normal = normal;
		// materialul suprafetei lovite de lumina
		this.material = material;
		if (raza se intersecteaza cu suprafata)
		// calculam distanta de la originea razei la punctul lovit;
	}
}

class Plane {
	center: Vector3;
	v1: Vector3;
	v2: Vector3;
	material: Material;

	constructor(center, v1, v2, material) {
		this.center = center; // centrul planului
		this.v1 = v1; // vectorul 1
		this.v2 = v2; // vectorul 2
		this.material = material; // materialul planului
	}

	suma_vectorilor() {
		// v2 + v1
	}

	intersectia_cu_raza() {
		const raza_la_centru = centrul_planului - originea_razei;
		const pozitie_raza = orientare_raza.produs_scalar_cu(orientare_plan);
		// orientare raza = vectorul raza
		// orientare plan = normala planului
		const pozitie_raza_la_centru = raza_la_centru.produs_scalar_cu(orientare_plan);
		const distanta_raza_plan = pozitie_raza_la_centru / pozitie_raza;
		return new HitPoint(distanta_raza_plan);
	}
}

class Sphere {
	center: Vector3;
	radius: number;
	material: Material;

	constructor(center, radius, material) {
		this.center = center; // centrul sferei
		this.radius = radius; // raza sferei
		this.material = material; // materialul sferei
	}

	intersectia_cu_raza() {
		const raza_la_centru = originea_razei - centrul_sferei;
		const a = 1;
		const b = 2 * raza.produs_scalar_cu(normala_din_centru);
		const c = raza_la_centru.produs_scalar_cu(raza_la_centru) - raza ^ 2;
		const delta = b ^ 2 - 4 * a * c;
		if (delta <= 0)
			// raza nu intersecteaza sfera
			const distanta1 = (-b + sqrt(delta)) / 2;
		const distanta2 = (-b - sqrt(delta)) / 2;
		const distanta_minima = min(distance1, distance2);
		return new HitPoint;
	}
}