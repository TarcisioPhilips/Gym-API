import { Environment } from "vitest";

export default <Environment>{
    name: "prisma",

    async setup() {
        // console.log("Antes dos testes");

        return {
            teardown() {
                // console.log("Depois dos testes")
            },
        };
    },
    transformMode: "ssr"
}
