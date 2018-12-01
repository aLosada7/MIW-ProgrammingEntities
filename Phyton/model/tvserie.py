class TVSerie:
    def __init__(self, entity, id, number_of_episodes, number_of_seasons, start_date):
        self.entity = entity
        self.id=id
        self.number_of_episodes=number_of_episodes
        self.number_of_seasons=number_of_seasons
        self.start_date=start_date

    def valid_id(self,series):
        for show in series:
            if show.id == self.id:
                return "Id already exists"
        return ""

    def is_valid(self):
        if self.number_of_episodes == 0:
            return "Wrong numberOfEpisodes introduced"
        if self.number_of_seasons == 0:
            return "Wrong numberOfSeasons introduced"
        if self.start_date:
            return "Wrong startDate introduced";
        return ""

    def update_entity(self,up_entity):
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

    def convert_html(self):
        return "<h2>ID: "+self.id+"</h2><p>N episodes: "+self.number_of_episodes+"</p><p>N seasons: "+self.number_of_seasons+"</p><p>Start date: "+self.start_date+"</p>"