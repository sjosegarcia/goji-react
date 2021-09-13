export interface SectionInDB {
	id: number;
	title: string;
	slug: string;
	body: string;
	created_on: Date;
	updated_on: Date;
	likes: number;
	dislikes: number;
}

export interface LessonInDB {
	id: number;
	title: string;
	slug: string;
	sections: SectionInDB[];
	created_on: Date;
	updated_on: Date;
	likes: number;
	dislikes: number;
}

export interface CourseInDB {
	id: number;
	title: string;
	slug: string;
	lessons: LessonInDB[];
	created_on: Date;
	updated_on: Date;
	likes: number;
	dislikes: number;
}

export interface ProgramInDB {
	id: number;
	title: string;
	slug: string;
	courses: CourseInDB[];
	created_on: Date;
	updated_on: Date;
}
