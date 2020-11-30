import { rollup, OutputOptions, RollupOptions, RollupBuild } from 'rollup';

const { uglify } = require('rollup-plugin-uglify');
const typescript = require('rollup-plugin-typescript');

const compressOptions = {
    warnings: 'verbose',
    compress: {
        collapse_vars: true,
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        evaluate: false,
        if_return: true,
        inline: true,
        reduce_vars: true,
        loops: true,
        passes: 1,
        unsafe_comps: true,
        typeofs: false
    },
    output: {
        semicolons: false
    },
    mangle: {
        reserved: ['_']
    },
    toplevel: false,
    ie8: false
};

/** handles writing out statuses and writing bundle */
async function write(bundle: RollupBuild, options: OutputOptions) {
    try {
        await bundle.write(options);
        console.log('\u2713 ' + options.file);
    } catch (e) {
        console.error('X ' + options.file + ': ' + JSON.stringify(e));
        throw e;
    }
}

async function bundle(inputOptions: RollupOptions, outputOptions: OutputOptions) {
    const bundleObj = await rollup(inputOptions);
    await write(bundleObj, outputOptions);
}

async function bundleAll() {
    return Promise.all([
        bundle(
            {
                input: 'src/index.ts',
                plugins: [
                    typescript({
                        typescript: require('typescript')
                    }) as any
                ]
            },
            {
                file: 'umd/csx.js',
                name: 'csx',
                format: 'umd'
            }
        ),
        bundle(
            {
                input: 'src/index.ts',
                plugins: [
                    typescript({
                        typescript: require('typescript')
                    }),
                    uglify(compressOptions) as any
                ]
            },
            {
                file: 'umd/csx.min.js',
                name: 'csx',
                format: 'umd'
            }
        )
    ]);
}

// process
(async () => {
    try {
        await bundleAll();
        process.exit();
    } catch (e) {
        console.error('Error processing bundles ', e.toString());
        process.exit(1);
    }
})();
