class Article:
    def __init__(self, context,entity, id, name, article_section):
        self.context=context
        self.entity = entity
        self.id=id
        self.name=name
        self.article_section=article_section

    def valid_id(self,articles):
        for article in articles:
            if article.id == id:
                return "Id already exists"
        return ""

    def is_valid(self):
        if self.name == "":
            return "Wrong name introduced"
        if self.article_section == "":
            return "Wrong numberOfSeasons introduced"
        return ""

    def update_entity(self,up_entity):
        self.id = up_entity.id
        self.name = up_entity.name
        self.article_section = up_entity.article_section

    def convert_json(self):
        return ({
                    '@context': self.context,
                    '@type': self.entity,
                    'id': self.id,
                    'name':self.name,
                    'articleSection': self.article_section
                })

    def convert_html(self):
        return "<h2>ID: "+self.id+"</h2><p>Name: "+self.name+"</p><p>Section: "+self.article_section+"</p>"