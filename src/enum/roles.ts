export const ROLES = {
	ADMIN: "admin",
	COLLABORATOR: "collaborator",
	USER: "user",
} as const;

export type Roles = (typeof ROLES)[keyof typeof ROLES];
