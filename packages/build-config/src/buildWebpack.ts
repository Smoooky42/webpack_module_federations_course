import webpack from 'webpack';
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolves} from "./buildResolves";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions) :webpack.Configuration {

    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    return {
        mode: options.mode ?? "development",
        entry: options.paths.entry,
        output: {
            path: options.paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolves(options),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}