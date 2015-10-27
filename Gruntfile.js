'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['js/*.js', 'css/*.less', 'views/*.jade'],
        options: {
          spawn: false,
        },
      },
    },
    wiredep: {
      task: {
        src: [
        'bower_module/*.js'
        ]  
      }
    },  
    connect: {
    server: {
      options: {
        port: 8000,
        hostname: '*',
        onCreateServer: function(server, connect, options) {
          var io = require('socket.io').listen(server);
          io.sockets.on('connection', function(socket) {
            // do something with socket 
          });
        }
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['watch', 'wiredep','connect']);

};