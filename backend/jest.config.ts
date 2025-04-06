import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	collectCoverage: true,
	collectCoverageFrom: ["src/Models/**.ts"],
	coverageDirectory: "coverage",
	testMatch: ["<rootDir>/test/**/*.ts"],
	verbose: true,
	transform: {
		"^.+\\.tsx?$": `ts-jest`,
	},
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1",
	},
};

export default config;
