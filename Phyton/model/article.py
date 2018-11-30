class Article:
    def __init__(self, entity, id, name, article_section):
        self.entity = entity
        self.id=id
        self.name=name
        self.article_section=article_section

    def is_valid(self):
        return true

    def convert_json(self):
        return ({
                    '@type': self.entity,
                    'id': self.id,
                    'name':self.name,
                    'articleSection': self.article_section
                })