import React from 'react'
import {StyleSheet, Text, FlatList, View} from 'react-native'
import {connect} from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'


class Favorites extends React.Component {
  render() {
    console.log(this.props.favoritesFilm)
    return(
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container:{
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
