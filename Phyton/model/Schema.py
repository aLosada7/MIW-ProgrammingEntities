class TVSeries:
    def __init__(self,series=None):
        self.series = [] if not series else series

    def add_tv_show(self, show):
        self.series.append(show)

class Articles:
    def __init__(self,articles=None):
        self.articles = [] if not articles else articles

    def add_article(self, article):
        self.articles.append(article)