from flask import render_template,json,Blueprint
from flask import request
from ..model import series
from ..model import articles

routes = Blueprint('routes', __name__)


@routes.route('/')
def hello_world():
    tipo=(request.headers['accept-language'])[:2]
    print(tipo);
    if tipo == "es":
        f = open('./model/informacion.html', "r").read()
        return str(f)
    else:
        f = open('./model/information.html', "r").read()
        return str(f)

@routes.route('/<entity>',methods=['GET', 'POST'])
def work_entity(entity):
    if request.method == 'POST':
        jsonpost = request.form['updateEntity']
        print(jsonpost)
        if entity == 'TVSeries':
            show=TVSerie(jsonpost['@type'], jsonpost['id'], jsonpost['numberOfEpisodes'], jsonpost['numberOfSeasons'], jsonpost['startDate'])
        elif entity=='Article':
            article=Article(i['@type'], i['id'], i['name'], i['articleSection'])
        password = request.form['password']
        print(password)
        return 'POST'
    elif request.method == 'GET':
        tipo = (request.headers['accept'])
        print(tipo)
        if entity == 'TVSeries':
            shows=[]
            for show in series.series:
                shows.append({
                    '@type': show.entity,
                    'id': show.id,
                    'numberOfEpisodes': show.number_of_episodes,
                    'numberOfSeasons': show.number_of_seasons,
                    'startDate':show.start_date
                })

            return json.dumps(shows)
        elif entity=='Article':
            for article in articles.articles:
                return json.dumps({
                    '@type': article.entity,
                    'id': article.id,
                    'name':article.name,
                    'articleSection': article.article_section
                })

@routes.route('/<entity>/<id>', methods=['GET', 'UPDATE', 'DELETE'])
def work_entity_id(entity,id):
    if request.method == 'GET':
        tipo = (request.headers['accept'])
        print(tipo)
        if entity == 'TVSeries':
            for show in series.series:
                if show.id == id:
                    print(show.id)
                    return json.dumps({
                        '@type': show.entity,
                        'id': show.id,
                        'numberOfEpisodes': show.number_of_episodes,
                        'numberOfSeasons': show.number_of_seasons,
                        'startDate':show.start_date
                    })
        elif entity == 'Article':
            for article in articles.articles:
                if article.id == id:
                    print(article.id)
                    return json.dumps({
                        '@type': article.entity,
                        'id': article.id,
                        'name':article.name,
                        'articleSection': article.article_section
                    })
    elif request.method == 'UPDATE':
        jsonpost = request.form['newEntity']
        print(jsonpost)
        password = request.form['password']
        print(password)
        return 'UPDATE'
    elif request.method == 'DELETE':
        password=request.form['password']
        if password=="passworddelete":
            if entity == 'TVSeries':
                for show in series.series:
                    if show.id == id:
                        print("dROP THIS")
            elif entity == 'Article':
                for article in articles.articles:
                    if article.id == id:
                        print('drop this')
        else:
            return "Wrong password"
        print(password)
        return 'DELETE'