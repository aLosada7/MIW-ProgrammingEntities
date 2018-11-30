from flask import render_template,json,Blueprint
from flask import request
from ..model import series
from ..model import articles
from ..model import TVSerie
from .. model import Article

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
    print(request.method)
    if request.method == 'POST':
        print(request.method)
        jsonpost = json.loads(request.form['newEntity'])
        print(jsonpost)
        if entity == 'TVSeries':
            show=TVSerie(jsonpost['@type'], jsonpost['id'], jsonpost['numberOfEpisodes'], jsonpost['numberOfSeasons'], jsonpost['startDate'])
            #isValid=show.is_valid()
            series.add_tv_show(show)
            save = []
            for show in series.series:
                save.append(show.convert_json())
            for articulo in articles.articles:
                save.append(articulo.convert_json())
            with open('./model/data.json', 'w') as f:
                json.dump(save, f)
            return 'Posted correctly'
        elif entity=='Article':
            article=Article(jsonpost['@type'], jsonpost['id'], jsonpost['name'], jsonpost['articleSection'])
            #isValid = show.is_valid()
            articles.add_article(article)
            save = []
            for show in series.series:
                save.append(show.convert_json())
            for articulo in articles.articles:
                save.append(articulo.convert_json())
            with open('./model/data.json', 'w') as f:
                json.dump(save, f)
            return 'Posted correctly'
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

@routes.route('/<entity>/<id>', methods=['GET', 'PUT', 'DELETE'])
def work_entity_id(entity,id):
    print(request.method)
    if request.method == 'GET':
        tipo = (request.headers['accept'])
        print(request.method)
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
    elif request.method == 'PUT':
        jsonput = json.loads(request.form['updateEntity'])
        print(jsonput['@type'])
        password = request.form['password']
        if password=="passwordput":
            if entity == 'TVSeries':
                update = TVSerie(jsonput['@type'], jsonput['id'], jsonput['numberOfEpisodes'],jsonput['numberOfSeasons'], jsonput['startDate'])
                for show in series.series:
                    if show.id == id:
                        show.update_entity(update)
                        break
                save = []
                for show in series.series:
                    save.append(show.convert_json())
                for articulo in articles.articles:
                    save.append(articulo.convert_json())
                with open('./model/data.json', 'w') as f:
                    json.dump(save, f)
                return 'Updated correctly'
            elif entity == 'Article':
                update = Article(jsonput['@type'], jsonput['id'], jsonput['name'], jsonput['articleSection'])
                for article in articles.articles:
                    if article.id == id:
                        article.update_entity(update)
                        break
                save = []
                for show in series.series:
                    save.append(show.convert_json())
                for articulo in articles.articles:
                    save.append(articulo.convert_json())
                with open('./model/data.json', 'w') as f:
                    json.dump(save, f)
                return 'Updated correctly'
        else:
            return "Wrong password"
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
                return "Wrong id"
        else:
            return "Wrong password"
        print(password)
        return 'DELETE'