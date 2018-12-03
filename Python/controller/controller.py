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
        res=""
        if entity == 'TVSeries':
            try:
                jsonpost['episode']
            except KeyError:
                jsonpost['episode'] = None
            show=TVSerie(jsonpost['@context'],jsonpost['@type'], jsonpost['id'], jsonpost['numberOfEpisodes'], jsonpost['numberOfSeasons'], jsonpost['startDate'],jsonpost['episode'])
            res = show.valid_id(series.series)
            if res == "":
                res = show.is_valid()
            else:
                return res
            res=show.is_valid()
            print(res)
            if res=="":
                series.add_tv_show(show)
                save = []
                for show in series.series:
                    save.append(show.convert_json())
                for articulo in articles.articles:
                    save.append(articulo.convert_json())
                with open('./model/data.json', 'w') as f:
                    json.dump(save, f)
                return 'Posted correctly'
            else:
                return res
        elif entity=='Article':
            article=Article(jsonpost['@context'],jsonpost['@type'], jsonpost['id'], jsonpost['name'], jsonpost['articleSection'])
            res = article.valid_id(series.series)
            if res == "":
                res = article.is_valid()
            else:
                return res
            print(res)
            if res == "":
                articles.add_article(article)
                save = []
                for show in series.series:
                    save.append(show.convert_json())
                for articulo in articles.articles:
                    save.append(articulo.convert_json())
                with open('./model/data.json', 'w') as f:
                    json.dump(save, f)
                return 'Posted correctly'
            else:
                return res
    elif request.method == 'GET':
        tipo = (request.headers['accept'])
        print(tipo)
        if entity == 'TVSeries':
            if tipo == "application/json":
                shows=[]
                for show in series.series:
                    print(show.episode)
                    for ep in show.episode:
                        print(ep.entity)
                    shows.append(show.convert_json())
                return json.dumps(shows)
            else:
                html="<h1>Entity: "+series.series[0].entity+"</h1>"
                for show in series.series:
                    html=html+show.convert_html()
                return html

        elif entity=='Article':
            if tipo=="application/json":
                for article in articles.articles:
                    return json.dumps(article.convert_json())
            else:
                html="<h1>Entity: "+articles.articles[0].entity+"</h1>"
                for art in articles.articles:
                    html=html+art.convert_html()
                return html

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
                    if tipo=="application/json":
                        return json.dumps(show.convert_json())
                    else:
                        html = "<h1>Entity: " + show.entity + "</h1>"
                        html = html + show.convert_html()
                        return html

        elif entity == 'Article':
            for article in articles.articles:
                if article.id == id:
                    print(article.id)
                    if tipo=="application/json":
                        return json.dumps(article.convert_json())
                    else:
                        html = "<h1>Entity: " + article.entity + "</h1>"
                        html = html + article.convert_html()
                        return html
    elif request.method == 'PUT':
        jsonput = json.loads(request.form['updateEntity'])
        print(jsonput['@type'])
        print(jsonput['@type'])
        password = request.form['password']
        if password=="passwordput":
            res=""
            if entity == 'TVSeries':
                try:
                    jsonput['episode']
                except KeyError:
                    jsonput['episode'] = None
                update = TVSerie(jsonput['@context'],jsonput['@type'], jsonput['id'], jsonput['numberOfEpisodes'],jsonput['numberOfSeasons'], jsonput['startDate'],jsonput['episode'])
                res = update.is_valid()
                if res=="":
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
                else:
                    return res
            elif entity == 'Article':
                update = Article(jsonput['@context'],jsonput['@type'], jsonput['id'], jsonput['name'], jsonput['articleSection'])
                res = update.is_valid()
                if res == "":
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
                    return res
        else:
            return "Wrong password"
    elif request.method == 'DELETE':
        password=request.form['password']
        if password=="passworddelete":
            if entity == 'TVSeries':
                indice=0
                for show in series.series:
                    if show.id == id:
                        p=series.series.pop(indice)
                        print(p)
                        save=[]
                        for show in series.series:
                            save.append(show.convert_json())
                        for articulo in articles.articles:
                            save.append(articulo.convert_json())
                        with open('./model/data.json', 'w') as f:
                            json.dump(save, f)
                        return "Delete correctly";
                    else:
                        indice=indice+1
                return "Id does not exist"
            elif entity == 'Article':
                indice=0
                for article in articles.articles:
                    if article.id == id:
                        p = articles.articles.pop(indice)
                        print(p)
                        save = []
                        for show in series.series:
                            save.append(show.convert_json())
                        for articulo in articles.articles:
                            save.append(articulo.convert_json())
                        with open('./model/data.json', 'w') as f:
                            json.dump(save, f)
                        return "Delete correctly";
                    else:
                        indice=indice+1
                return "Wrong id"
        else:
            return "Wrong password"