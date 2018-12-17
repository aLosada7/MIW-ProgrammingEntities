# MIW-ProgrammingEntities
Development of an app for the subject OO Programming with NodeJS, Phyton and PHP. 

Ports used:
NodeJS: 0.0.0.0:8081
PHP: 0.0.0.0:8082
Python: 0.0.0.0:8083

How to activate servers:
NodeJS: node app.js (from the folder, it listens on the port 8081 of your host)

PHP: php -S 0.0.0.0:8082 (change your IP)

Python: set FLASK_APP==__init__.py(maybe neccessary)
	flask run --host=0.0.0.0 --port=8083


Optional parts implemented:
	-The contact form sents an email to the client
	-Security. Password authentification on PUT and DELETE actions, being authentified by the server selected
	-Developed using Github
	-Test in NodeJS with Mocha
