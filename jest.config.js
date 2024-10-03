module.exports = {
	collectCoverage: true,
	coverageProvider: "babel",
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!<rootDir>/out/**",
		"!<rootDir>/.next/**",
		"!<rootDir>/*.config.js",
		"!<rootDir>/coverage/**",
	],
	moduleNameMapper: {
		"^@/lib/(.*)$": "<rootDir>/lib/$1",
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

		"^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

		"^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`,

		"^@/components/(.*)$": "<rootDir>/components/$1",

		"@next/font/(.*)": `<rootDir>/__mocks__/nextFontMock.js`,
		"next/font/(.*)": `<rootDir>/__mocks__/nextFontMock.js`,
		"server-only": `<rootDir>/__mocks__/empty.js`,
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
	testEnvironment: "jsdom",
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
	transformIgnorePatterns: [
		"/node_modules/",
		"^.+\\.module\\.(css|sass|scss)$",
	],
};
