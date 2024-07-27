import {Configuration, DefinePlugin} from 'webpack'
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, '22246-1-blue-butterfly.png'),
            publicPath: '/',     //для корректной работы HistoryApi с микрофронтами и запашивания данных по адресу микрофронта, а не хоста
        }),
//        new DefinePlugin({__PLATFORM: options.platform}),     // Для использование переменных окружения как глобальные переменные. Также необходима декларация переменной в global.d.ts

    ]

    if(isDev){
 //       plugins.push(new ForkTsCheckerWebpackPlugin())  //Проверка типов отдельным процессом
        plugins.push(new ReactRefreshWebpackPlugin())          //Для Hot module replacement
    }

    if(isProd) {
        plugins.push(
            new MiniCssExtractPlugin({      //css в отдельный файлик
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
            })
        )
 //       plugins.push(new BundleAnalyzerPlugin()),    //Размеры бандлов
        plugins.push(new CopyPlugin({           //Копирует файлы в итоговый билд
            patterns: [
                {from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales')}
            ]
        }))
    }

    return plugins;
}