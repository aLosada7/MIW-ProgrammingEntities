class TVSerie:
    def __init__(self, entity, id, number_of_episodes, number_of_seasons, start_date):
        self.entity = entity
        self.id=id
        self.number_of_episodes=number_of_episodes
        self.number_of_seasons=number_of_seasons
        self.start_date=start_date

    def is_valid(self):
        return true

    def update_entity(self,up_entity):
        self.entity = up_entity.entity
        self.id = up_entity.id
        self.number_of_episodes = up_entity.number_of_episodes
        self.number_of_seasons = up_entity.number_of_seasons
        self.start_date = up_entity.start_date

    def convert_json(self):
        return ({
                    '@type': self.entity,
                    'id': self.id,
                    'numberOfEpisodes': self.number_of_episodes,
                    'numberOfSeasons': self.number_of_seasons,
                    'startDate':self.start_date
                })