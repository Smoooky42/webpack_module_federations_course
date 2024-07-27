import path from 'path';
import webpack from "webpack";
import {buildWebpack, BuildMode, BuildOptions, BuildPaths} from "@packages/build-config"
import packageJson from './package.json'

interface EnvVariables{
    mode: BuildMode,
    port: number;
}

export default (env: EnvVariables) => {

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: path.resolve(__dirname, 'build'),
        public: path.resolve(__dirname, 'public'),
        html: path.resolve(__dirname, 'public/index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3002,
        mode: env.mode ?? "development",
        paths,
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'admin',
        filename: 'remoteEntry.js',
        exposes: {
            //'./App':path.resolve(paths.src, 'components', 'App', 'Router.tsx'),
            './Router': './src/router/Router.tsx',
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            }
        }
    }))

    return config;
}