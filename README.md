# README #

This README contains the necessary steps to get the web application up and running. You can request for extra information to be added by talking to the persons listed in this README.

### Premar Systems Website ###
* Version: v1.0.0
* This repo contains the code for the primary website of Super Stallion Logistics

### How do I get set up? ###

* Summary of set up
* Configuration
### Dependencies ###
### Database configuration ###

### How to run tests ###

`$ npm run test` -- this runs the tests.

`$ npm run test:coverage` -- this runs the tests and provides coverage report.

`$ DEBUG_PRINT_LIMIT=100000 npm run test` -- run the tests using this command (in Linux/Mac) to increase the limit of the logged content of the DOM under test when a test fails. [Read more here.](https://testing-library.com/docs/dom-testing-library/api-helpers#debugging)

### Running in Development Mode ###
`$ npm run dev` -- this runs the Next.JS server in development mode.

### Production Deployment Instructions ###

1. Log into the Amazon EC2 instance: 
`$ ssh -i /path/my-key-pair.pem my-instance-user-name@my-instance-public-dns-name`
1. cd into the working directory:
`$ cd /srv/applications/super-stallion-logistics-website`
1. Pull the latest sources:
`$ git pull`
1. Build the Next.JS project:
`$ npm run build`
1. Run `$ ps aux | grep next` to check if an instance of the Next.JS server is running.
1. If an instance is running, kill it with: `$ sudo pkill -f next`
1. Run `$ ps aux | grep next` to confirm that no instance of the Next.JS server is running.
1. Run `$ nohup npm run start &` to start a Next.JS server instance that will keep running in the background when you close the shell terminal.
1. Exit the shell terminal by running `$ exit`

### Contribution guidelines ###

### Writing tests ###
Tests are written with React Testing Library using Jest

### Code review ###

### Other guidelines ###
Try to write clean code. Performance, security, and accessibility are the top priorities from a user perspective. From a developer perspective make your code readable, extensible, and maintainable.

### Who do I talk to? ###

* Denis O.: <denis@premar.tech> | Kelvin K.: <kelvin@premar.tech>
* Inquiries/Support: <support@premar.tech>