import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";
import path from "path";


export function buildResolves(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            '@': options.paths.src,
        }
    }
}