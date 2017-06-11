
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // CONFIGURE GRUNT ===========================================================
    grunt.initConfig({

        // get the configuration info from package.json
        pkg: grunt.file.readJSON('package.json'),

        serve: {
            options: {
                port: 8080,
            }
        },
    });

    grunt.registerTask('install', ['npm-install', 'bower-install']);

    grunt.registerTask('default', ['serve']);

    // LOAD GRUNT PLUGINS ========================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-bower-install');
};