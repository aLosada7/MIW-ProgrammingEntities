<?php
class TVSeries{
	private $numberOfEpisodes;
	function __construct($TVseries){
		$this->numberOfEpisodes = $TVseries['numberOfEpisodes']; // decode the JSON feed
	}
}

?>