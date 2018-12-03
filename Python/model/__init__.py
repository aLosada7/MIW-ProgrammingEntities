from .article import Article
from .tvserie import TVSerie
from flask import json
from .Schema import Articles
from .Schema import TVSeries


f = json.loads(open('./model/data.json', "r").read())
series=TVSeries()
articles=Articles()
for i in f:
    if i['@type']=='TVSeries':
        try:
            i['episode']
        except KeyError:
            i['episode'] = None
        series.add_tv_show(TVSerie(i['@context'],i['@type'], i['id'],i['numberOfEpisodes'],i['numberOfSeasons'],i['startDate'],i['episode']))
    elif i['@type']=='Article':
        print("soy article")
        articles.add_article(Article(i['@context'],i['@type'], i['id'], i['name'], i['articleSection']))
#TVSeries.append(player)
print(f)