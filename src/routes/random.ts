export class Random {
	a: number;
	b: number;

	constructor(seed = 0) {
		this.a = seed;
		this.b = seed;
		console.dir(seed);
	}

	nextInt() {
		this.a = (this.a * 67307) & 0xffff;
		this.b = (this.b * 67427) & 0xffff;
		return this.a ^ (this.b << 15);
	}

	reset(seed: number) {
		this.a = this.b = seed | 0;
	}

}
