import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}}/>
        <View style={styles.content}>
          <View style={styles.header}>
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
      </View>
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
  },
  description: {
    fontStyle: 'italic',
    flex: 7
  },
  sortie: {
    textAlign: 'right',
    flex: 1
  }
})

export default FilmItem
