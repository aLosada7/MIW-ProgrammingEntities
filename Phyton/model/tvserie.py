from flask import json
class TVSerie:
    def __init__(self, context,entity, id, number_of_episodes, number_of_seasons, start_date,episode):
        self.context=context
        self.entity = entity
        self.id=id
        self.number_of_episodes=number_of_episodes
        self.number_of_seasons=number_of_seasons
        self.start_date=start_date
        self.episode=[]
        if episode != None:
            print(episode)
            try:
                for i in episode:
                    self.episode.append(Episode(i['@type'], i['episodeNumber']))
            except TypeError:
                self.episode.append(Episode(episode['@type'], episode['episodeNumber']))
        for ep in self.episode:
            print("hola"+ep.entity)



    def valid_id(self,series):
        for show in series:
            if show.id == self.id:
                return "Id already exists"
        return ""

    def is_valid(self):
        if self.context !=  "http://schema.org":
            return "Wrong context introduced"
        if self.entity != "TVSeries":
            return "Wrong type introduced"
        if self.number_of_episodes == 0:
            return "Wrong numberOfEpisodes introduced"
        if self.number_of_seasons == 0:
            return "Wrong numberOfSeasons introduced"
        if self.start_date == "date":
            return "Wrong startDate introduced";
        return ""

    def update_entity(self,up_entity):
        self.id = up_entity.id
        self.number_of_episodes = up_entity.number_of_episodes
        self.number_of_seasons = up_entity.number_of_seasons
        self.start_date = up_entity.start_date
        i=0
        for ep in self.episode:
            self.episode[i].number_of_episode=up_entity.episode[i].number_of_episode
            i=i+1

    def convert_json(self):
        result=({
                    '@context': self.context,
                    '@type': self.entity,
                    'id': self.id,
                    'numberOfEpisodes': self.number_of_episodes,
                    'numberOfSeasons': self.number_of_seasons,
                    'startDate':self.start_date
                })
        if self.episode!=None:
            if len(self.episode) == 1:
                result.update({"episode": {
                    '@type': self.episode[0].entity,
                    'episodeNumber': self.episode[0].number_of_episode
                }
                })
            else:
                vect = []
                for ep in self.episode:
                    vect.append({
                            '@type': ep.entity,
                            'episodeNumber': ep.number_of_episode
                        })
                print(vect)
                result.update({"episode":vect})

        return result


    def convert_html(self):
        result="<h2>ID: "+self.id+"</h2><p>N episodes: "+self.number_of_episodes+"</p><p>N seasons: "+self.number_of_seasons+"</p><p>Start date: "+self.start_date+"</p>"
        for ep in self.episode:
            result=result+ep.convert_html()
        return result;

class Episode(TVSerie):
    def __init__(self, entity, number_of_episode):
        self.entity = entity
        self.number_of_episode = number_of_episode

    def convert_html(self):
        return "<h3>EpisodeNumber: "+self.number_of_episode+"</h3>"