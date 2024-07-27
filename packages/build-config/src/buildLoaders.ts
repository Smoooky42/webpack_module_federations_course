import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import {removeDataTestBabelPlugin} from "./babel/removeDataTestBabelPlugin";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{loader: '@svgr/webpack', options: {icon: true}}],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
            },
        }
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            cssLoaderWithModules,
            "sass-loader"
        ],
    }

    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,    //Сборка БЕЗ проверки типов typescript(true)
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    })
                }
            }
        ],
    }

    const babelLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                // presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', {
                //     runtime: isDev ? 'automatic' : 'classic',
                // }],],
                plugins: [
                    [
                        removeDataTestBabelPlugin(),
                        {
                            props: ['data-testid']
                        }
                    ]
                ]
            }
        },
    }

    return [
        svgrLoader,
        assetLoader,
        scssLoader,
        tsLoader,
//        babelLoader
    ]
}