export enum FilterKind { // under templates on whiteboard
	Range,
	Categorical,
	MultiSelect,
	TwoRange,
}

export interface Trial {
	name: String,
	filters: Map<String, FilterKind>, // name to type
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
	value: String,
	type: FilterKind,
}

export interface TrialData {
	independentVariable: Attribute,
	before: Array<Attribute>,
	after: Array<Attribute>,
	notes: String,
}
