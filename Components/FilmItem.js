import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { getImageFromApi } from '../API/TMDBAPI'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if(this.props.isFilmFavorite) {
      return(
        <Image style={styles.favorite_image} source={require('../Images/ic_favorite.png')}/>
      )
    }
  }

  render() {
    const {film, displayDetailForFilm} = this.props
    return(
      <TouchableOpacity style={styles.container} onPress={() => displayDetailForFilm(film.id)}>
        <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}}/>
        <View style={styles.content}>
          <View style={styles.header}>
            {this._displayFavoriteImage()}
            <Text style={styles.titre}>
              {film.title}
            </Text>
            <Text style={styles.vote}>
              {film.vote_average}
            </Text>
          </View>
          <Text style={styles.description} numberOfLines={6}>
            {film.overview}
          </Text>
          <Text style={styles.sortie}>
            Sorti le {film.release_date}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    margin: 5,
    flex: 1
  },
  content: {
    margin: 5,
    flexDirection: 'column',
    flex: 2
  },
  header: {
    flex: 3,
    flexDirection: 'row'
  },
  titre: {
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex: 1
  },
  vote: {
    paddingRight: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green'
  },
  description: {
    fontStyle: 'italic',
    flex: 7
  },
  sortie: {
    textAlign: 'right',
    flex: 1
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }

})

export default FilmItem
