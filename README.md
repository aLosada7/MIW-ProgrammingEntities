# MIW-ProgrammingEntities

 Javascript application for HTTP method requests using Schema Models and the JSON-LD format. You will be able to make GET, POST, PUT and DELETE petitions with different techonologies (NodeJS, PHP and Python) over Schema.org entities and their hierarchically related entities

Ports used:
- NodeJS: 0.0.0.0:8081
- PHP: 0.0.0.0:8082
- Python: 0.0.0.0:8083

# Using
NodeJS (from the folder, it listens on the port 8081 of your host)
```
node app.js
```

PHP
```
php -S 0.0.0.0:8082 
```

Python
``` 
set FLASK_APP==__init__.py //maybe neccessary
flask run --host=0.0.0.0 --port=8083
``` 


## Others things implemented:
	-The contact form sents an email to the client
	-Security. Password authentification on PUT and DELETE actions, being authentified by the server selected
	-Developed using Github
	-Test in NodeJS with Mocha
