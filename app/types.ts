export enum FilterKind { // under templates on whiteboard
	Range,
	Categorical,
	MultiSelect,
}

export enum AttKind {
	 Number,
	 String,
	 Array
}

export interface Trial {
	name: String,
	filters: Map<String, Filter>, // name to type
	eligible: Array<Patient>,
	consented: Array<Patient>,
	trialData: Map<String, TrialData>, // id to data
}

export interface Patient {
	name: String,
	id: String,
	attributes: Map<String, Attribute>, // name to data
	notes: String,
}

export interface Attribute {
	value: String | Number | Array<String>,
	type: AttKind,
}

export interface TrialData {
	independentVariable: Attribute,
	before: Array<Attribute>,
	after: Array<Attribute>,
	notes: String,
}

export interface Filter {
		name: string;
		type: FilterKind.Range | FilterKind.Categorical | FilterKind.MultiSelect;
		options: Array<string> | Array<Number>;
};
